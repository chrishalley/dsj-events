import Vuex from 'vuex'
import Cookie from 'js-cookie'
import firebase from '~/plugins/firebase'
import { auth } from '~/plugins/firebase'

const createStore = () => {
  return new Vuex.Store({
    state: {
      currentUser: null,
      dsjEvents: [],
      editEvent: null
    },
    mutations: {
      setCurrentUser(state, payload) {
        state.currentUser = payload
      },
      // setToken(state, token) {
      //     state.currentUser.token = token
      // },
      // setTokenServer(state, token) {
      //     state.currentUser.token = token
      // },
      // clearToken(state) {
      //   state.currentUser.token = null
      // },
      addEvent(state, dsjEvent) {
        state.dsjEvents.push({dsjEvent})
        console.log('event pushed into Vuex state')
      },
      setEditEvent(state, dsjEvent) {
        console.log('setEditEvent() mutation')
        state.editEvent = {...dsjEvent}
      },
      clearEditEvent(state) {
        state.editEvent = null
      }
    },
    getters: {
      currentUser(state) {
        return state.currentUser
      },
      isUserAuthenticated(state) {
        return state.currentUser != null
      },
      // vuexToken(state) {
      //   return state.currentUser.token
      // },
      getDsjEvents(state) {
        return state.dsjEvents
      },
      getEditEvent(state) {
        console.log('getEditEvent() getter')
        return state.editEvent
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
                console.log('Error: More than one email match')
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
                reject('No account found')
              }
            })
            .catch(e => {
              console.log(e)
            })
        })
      },
      authenticateUser(vuexContext, authData) {
        return new Promise((resolve, reject) => {
          return auth.signInWithEmailAndPassword(authData.email, authData.password)
          .then((res) => {
            Cookie.set('dsj_uid', auth.currentUser.uid)
            vuexContext.commit('setCurrentUser', res.user)
            resolve()
          })
          .catch((e) => {
            console.log(e)
            reject()
          })
        })
        // return new Promise((resolve, reject) => {
        //   return this.$axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.fbAPIKey}`, {
        //     email: authData.email,
        //     password: authData.password,
        //     returnSecureToken: true
        //   })
        //   .then(res => {
        //     let token, tokenExpirationDate, currentUser
        //     token = res.data.idToken
        //     tokenExpirationDate = new Date().getTime() + (Number.parseInt(res.data.expiresIn) * 1000)
        //     localStorage.setItem('token', token)
        //     localStorage.setItem('tokenExpirationDate', tokenExpirationDate)
        //     Cookie.set('token', token)
        //     Cookie.set('tokenExpirationDate', tokenExpirationDate)
        //     vuexContext.commit('setToken', token)
        //     vuexContext.dispatch('setCurrentUser')
        //     resolve()
        //   })
        //   .catch(e => {
        //     reject(e)
        //   })
        // })
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
        // Create new user in Firebase Auth Dashboard
        let tempUserKey = userData.userId
        firebase.auth().createUserWithEmailAndPassword(userData.email, 'password')
        .then((res) => {
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
        .then(() => {
          console.log('User suspended')
        })
        .catch(e => {
          console.log(e)
        })
      },
      reinstateUser(vuexContext, userData) {
        console.log(userData)
        firebase.database().ref('/users/' + userData.userId).update({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          userStatus: 'Approved',
          applicationDate: userData.applicationDate,
          approvedDate: userData.approvedDate,
          userId: userData.userId
        })
        .then(() => {
          console.log('User reinstated')
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
        // // Remove local storage token and expiry
        // localStorage.removeItem('token')
        // localStorage.removeItem('tokenExpirationDate')
        // // Remove Cookie token and expiry
        // Cookie.remove('token')
        // Cookie.remove('tokenExpirationDate')
        // // Change state of user
        // vuexContext.commit('unsetCurrentUser')
        // vuexContext.commit('clearToken')
        auth.signOut()
          .then(() => {
            // Push to home
            Cookie.remove('dsj_uid')
            vuexContext.commit('setCurrentUser', null)
            this.$router.push('/login/')
          })
          .catch((e) => {
            console.log(e)
          })
      },
      getUserByEmail(vuexContext, user) {
        return firebase.auth().fetchSignInMethodsForEmail(user.email)
        .then((res) => {
          return res.length > 0
        })
      },
      saveEvent(vuexContext, dsjEvent) {
        return new Promise((resolve, reject) => {
          firebase.database().ref('/events/').push({
            title: dsjEvent.title,
            description: dsjEvent.description,
            startDateTime: dsjEvent.startDateTime,
            endDateTime: dsjEvent.endDateTime
          })
          .then((res) => {
            let key = res.key
            return firebase.database().ref('/events/').child(key).update({
              id: key
            })
          })
          .then(() => {
            vuexContext.commit('addEvent', dsjEvent)
            resolve()
          })
          .catch(() => {
            reject()
          })
        })
      },
      checkEventAvailability(vuexContext, eventTimes) {
        // Check if there is any event at all between the start and end dates

        // If not, return a pass

        // If there is, check whether the requested event clashes with the booked event 
        // a clash is when: 
        // (requestedEventStartTime > bookedEventStartTime && requestedEventStartTime < bookedEventEndTime) || (requestedEventEndTime > bookedEventStartTime && requestedEventEndTime < bookedEventEndTime)
        // If there is a clash, do not take the booking and notify the user
        // If there is not a clash, check for sufficient time before or after the requested event for a change-over of hall
        // If there is sufficient time, take the booking
        // If not, inform the user of the minimum time required and offer to change start or end time
      },
      getEventData() {
        return new Promise((resolve, reject) => {
          return this.$axios.get(process.env.baseURL + 'events.json')
          .then((res) => {
            resolve(res)
          })
          .catch((e) => {
            reject(e)
          })
        })
      },
      setEditEvent(vuexContext, dsjEvent) {
        console.log('setEditEvent() action')
        vuexContext.commit('setEditEvent', dsjEvent)
      },
      clearEditEvent(vuexContext) {
        console.log('clearEditEvent()')
        vuexContext.commit('clearEditEvent')
      },
      async nuxtServerInit(vuexContext, context) { // Loads current user data on initialisation
        let uidCookie
        if (context.req) {
          if (!context.req.headers.cookie) {
            return
          } else {
            uidCookie = parseCookie(context, 'dsj_uid')
            await context.app.$axios.get(process.env.baseURL + 'users/' + uidCookie + '.json')
            .then((res) => {
              vuexContext.commit('setCurrentUser', res.data)
            })
            .catch((e) => {
              console.log('Error: ', e)
            })
          }
        } else {
          return
        }
      },
      addCookie(context, payload) {
        Cookie.set('random', payload)
      }
    }
  })
}

function parseCookie(context, targetCookie) {
  let cookies, cookiesArray, cookie 
    cookies = context.req.headers.cookie
    cookiesArray = cookies.split(';').map((curr) => {
      return curr.trim()
    })
    cookie = cookiesArray.find((curr) => {
      return curr.startsWith(targetCookie)
    })
    if (cookie) {
      return cookie.split('=')[1]
    } else {
      return 
    }
}

export default createStore
