import Vuex from 'vuex'
import Cookie from 'js-cookie'
import firebase from '~/plugins/firebase'
import { resolve } from 'url';

const createStore = () => {
  return new Vuex.Store({
    state: {
      currentUser: {
        username: '',
        token: null
      }
    },
    mutations: {
      setCurrentUser(state, payload) {
        state.currentUser.username = payload.email
      },
      setToken(state, token) {
          state.currentUser.token = token
      },
      setTokenServer(state, token) {
          state.currentUser.token = token
      },
      clearToken(state) {
        state.currentUser.token = null
      },
      unsetCurrentUser(state) {
        state.currentUser.username = ''
      }
    },
    getters: {
      currentUser(state) {
        return state.currentUser
      },
      isUserAuthenticated(state) {
        return state.currentUser.token != null
      },
      vuexToken(state) {
        return state.currentUser.token
      }
    },
    actions: {
      checkUserStatus(vuexContext, authData) { // Check status of existing user account before allowing login
        return new Promise((resolve, reject) => {
          return this.$axios.get(`${process.env.baseURL}users.json?orderBy="email"&equalTo="${authData.email}"`)
            .then(res => {
              const matchArray = Object.keys(res.data).map((key) => {
                return Object(res.data[key])
              })
              if (matchArray.length > 1) {
              } else if (matchArray.length === 1) {
                if (matchArray[0].userStatus.toLowerCase() === "suspended") {
                  reject('This user is suspended!')
                } else if (matchArray[0].userStatus.toLowerCase() === "pending") {
                  reject('This user is pending...')
                }else {
                  console.log('This user is approved')
                  resolve()
                }
              } else {
                reject('Error: no matches')
              }
            })
            .catch(e => {
              console.log(e)
            })
        })
      },
      authenticateUser(vuexContext, authData) {
        return new Promise((resolve, reject) => {
          return this.$axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.fbAPIKey}`, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(res => {
            let token, tokenExpirationDate
            token = res.data.idToken
            tokenExpirationDate = new Date().getTime() + (Number.parseInt(res.data.expiresIn) * 1000)
            localStorage.setItem('token', token)
            localStorage.setItem('tokenExpirationDate', tokenExpirationDate)
            Cookie.set('token', token)
            Cookie.set('tokenExpirationDate', tokenExpirationDate)
            vuexContext.commit('setToken', token)
            console.log('REsolve auth user')
            resolve('Boobs')
          })
          .catch(e => {
            console.log(e)
            reject()
          })
        })
      },
      initAuth(vuexContext, req) { // Runs between admin route changes to check validity of token and tokenExpiryDate
        // Set variables
        let token, tokenExpirationDate, uid
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          token = req.headers.cookie.split(';').find(c => c.trim().startsWith('token=')).split('=')[1]
          if (!token) {
            return
          }
          tokenExpirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('tokenExpirationDate=')).split('=')[1]
        } else {
          token = localStorage.getItem('token')
          tokenExpirationDate = localStorage.getItem('tokenExpirationDate')
        }       
        // If token has expired or there is no token, then return
        if (new Date().getTime() > Number.parseInt(tokenExpirationDate) || !token) {
          console.log('Token expired or no token')
          return
        }
        // If process is running in browser, set localStorage token and expiry
        if (process.client) {
          localStorage.setItem('token', token)
          localStorage.setItem('tokenExpirationDate', tokenExpirationDate)
        } else {
          // If process is running on server, set Cookie token and expiry
          Cookie.set('token', token)
          Cookie.set('tokenExpirationDate', tokenExpirationDate)
        }
        vuexContext.commit('setToken', token)
      },
      applyUser(vuexContext, userData) {
        // ! Need to run checks to see if user has applied before

        // Create an empty entry in the users node so that we can store the reference in the temporary user's data
        let newUserKey = firebase.database().ref('users').push().key
        console.log(newUserKey)

        // UPDATE that empty entry with the user's information, including the reference key
        return new Promise((resolve, reject) => {
          firebase.database().ref('/users/' + newUserKey).update({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            userStatus: 'Pending',
            applicationDate: (new Date()).toString(),
            userId: newUserKey
          })
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
        })
      },
      registerUser(vuexContext, userData) {
        firebase.database().ref('users/').push({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          userStatus: 'Pending',
          applicationDate: (new Date()).toString(),
          userId: ''
        })
        .then(res => {
          console.log(res)
          let key = res.key
          firebase.database().ref('users/').child(key).update({
            userId: key
          })
        })
        .catch(e => {
          console.log(e)
        })
      },
      approveUser(vuexContext, userData) {
        console.log('approveUser() action started')
        console.log(userData)
        // let user = firebase.database().ref('users' + userData.userId)
        // Check for user's existence in Firebase Auth
        this.$axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${process.env.fbAPIKey}`, userData.userId)
          .then(res => {
            console.log('Check: ', res)
          })
          .catch(e => console.log(e))
        // Create new user in Firebase Auth Dashboard
        let tempUserKey = userData.userId
        console.log(tempUserKey)
        firebase.auth().createUserWithEmailAndPassword(userData.email, 'password')
        .then((res) => {
          console.log('User creation res: ')
          console.log(res.user.uid)
          //Create matching user entry in Firebase Database
          firebase.database().ref('/users/' + res.user.uid).set({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            userStatus: 'Approved',
            applicationDate: userData.applicationDate,
            approvedDate: new Date().toString(),
            userId: res.user.uid
          })
          // Delete old entry for pending user
          firebase.database().ref('/users/' + tempUserKey).remove()
          console.log('Temp user deleted')
        })
        .catch(e => {
          console.log(e)
        })
      },
      deleteUser(vuexContext, userData) {
        console.log('User to delete: ')
        firebase.database().ref('/users/' + userData.userId).remove()
        .then(res => {
          console.log('User deleted: ')
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
      },
      suspendUser(vuexContext, userData) {
        firebase.database().ref('/users/' + userData.userId).update({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          userStatus: 'Suspended',
          applicationDate: userData.applicationDate,
          approvedDate: userData.approvedDate,
          userId: userData.userId
        })
        .then(res => {
          console.log('User suspended:')
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
      },
      setTokenExpire(vuexContext, duration) {
        setTimeout(() => {
          console.log('setTokenExpire')
          vuexContext.commit('clearToken')
        }, duration * 1000)
      },
      logUserOut(vuexContext) {
        // Remove local storage token and expiry
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpirationDate')
        // Remove Cookie token and expiry
        Cookie.remove('token')
        Cookie.remove('tokenExpirationDate')
        // Change state of user
        vuexContext.commit('unsetCurrentUser')
        vuexContext.commit('clearToken')

        // Push to home
        this.$router.push('/login/')
      },
      removeToken(vuexContext) {



      },
      preLogIn(vueContext, email) {
        

        return new Promise(function(resolve, reject){
          let query = firebase.database().ref('/users/').orderByKey()
          // console.log(query)
          resolve(
            query.once('value')
          .then(res => {
            let users = res.val()
            return users
          })
          )
        })
      }
    }
  })
}

export default createStore
