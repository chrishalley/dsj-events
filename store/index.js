import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      currentUser: {
        loggedIn: false,
        username: '',
        token: null
      }
    },
    mutations: {
      // createNewUser(state, payload) {
      //   console.log(payload)
      // },
      setCurrentUser(state, payload) {
        state.currentUser.username = payload.email
        state.currentUser.loggedIn = true
      },
      setToken(state) {
          state.currentUser.token = localStorage.getItem('token')
      },
      setTokenServer(state, token) {
          state.currentUser.token = token
      },
      clearToken(state) {
        console.log('clear token mutation')
        state.currentUser.token = null
      },
      unsetCurrentUser(state) {
        state.currentUser.username = ''
        state.currentUser.loggedIn = false
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
      authenticateUser(vuexContext, authData) {
        let authURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.fbAPIKey

        return this.$axios.$post(authURL, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res)
          //Set token and expiration date in local storage
          localStorage.setItem('token', res.idToken)
          localStorage.setItem('tokenExpiration', new Date().getTime() + (res.expiresIn * 1000))
          // Commit mutations to set current user and token in Vuex store
          vuexContext.commit('setCurrentUser', res)
          vuexContext.commit('setToken')
          // Set the token and expiration date in cookie
          Cookie.set('jwt', res.idToken)
          Cookie.set('expirationDate', new Date().getTime() + (res.expiresIn * 1000))
          // Dispatch action to clear token from Vuex store once token becomes invalid
          vuexContext.dispatch('setTokenExpire', res.expiresIn)
        })
        .catch(e => {
          console.log(e)
        })
      },
      registerUser(vuexContext, userData) {
        let authURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.fbAPIKey

        return this.$axios.$post('https://dsj-events-app.firebaseio.com/users.json', {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          applicationDate: new Date(),
          userStatus: 'Pending'
        })
        .then(res => {
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
        console.log('log user out action')
        console.log(new Date().getTime())
        console.log(localStorage.getItem('tokenExpiration'))
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiration')
        vuexContext.commit('clearToken')
        vuexContext.commit('unsetCurrentUser')
        this.$router.push('/login/')
      },
      removeToken(vuexContext) {



      },
      initAuth(vuexContext, req) {

        // Set variables
        let token
        let expirationDate
        console.log('initAuth begun')

        if (req) {
          console.log('function running on server')
          if (!req.headers.cookie) {
            console.log('No cookie in header')
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='))
            console.log(jwtCookie)
          if (!jwtCookie) {
            console.log('no jwtCookie')
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1]
          vuexContext.commit('setTokenServer', token)
        } else {
          console.log('function running in browser')
          // Get token values from local storage
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')

          // If token has expired or there is no token, then return
          if (new Date().getTime() > +expirationDate || !token) {
            console.log('Token expired or no token')
            return
          }
          vuexContext.commit('setToken')
        }
        // Token exists and is not expired so dispatch token timeout action with remaining time
        console.log('Token exists and is valid')
        vuexContext.dispatch('setTokenExpire', +expirationDate - new Date().getTime())
        // Set token in Vuex store
        // vuexContext.commit('setToken')
        // Use token to get user from Firebase - Don't think I need all this:
        // this.$axios.$post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=' + process.env.fbAPIKey, {
        //   idToken: token
        // })
        // .then(res => {
        //   console.log(res)
        //   let user = res.users[0]
        //   console.log(user)
        //   vuexContext.commit('setCurrentUser', user)
        // })
        // .catch(e => {
        //   console.log(e)
        // })

      },
      loadUsers() {
        
      }
      // checkToken () {
      //   let currentTime = new Date().getTime()
      //   let tokenExpiry = localStorage.getItem('tokenExpiration')
      //   console.log('Current Time: ' + currentTime)
      //   console.log('Token Expiry: ' + tokenExpiry)
      // }
    }
  })
}

export default createStore
