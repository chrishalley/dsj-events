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
      clearToken(state) {
        state.currentUser.token = null
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
        if (!authData.isLogin) {
          authURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.fbAPIKey
        }
        return this.$axios.$post(authURL, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          vuexContext.commit('setCurrentUser', res)
          localStorage.setItem('token', res.idToken)
          localStorage.setItem('tokenExpiration', new Date().getTime() + (res.expiresIn * 3600))
          vuexContext.commit('setToken')
          Cookie.set('jwt', res.idToken)
          Cookie.set('expirationDate', new Date().getTime() + (res.expiresIn * 3600))
          vuexContext.dispatch('setTokenExpire', res.expiresIn)
        })
        .catch(e => {
          console.log(e)
        })
      },
      setTokenExpire(vuexContext, duration) {
        setTimeout(() => {
          vuexContext.commit('clearToken')
        }, duration * 1000)
      },
      removeToken(vuexContext) {
        // localStorage.setItem('token', null)
        console.log(new Date().getTime())
        console.log(localStorage.getItem('tokenExpiration'))
      },
      initAuth(vuexContext, req) {
        let token
        let expirationDate
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')

          if (new Date().getTime() > +expirationDate || !token) {
            return
          }
        }
        vuexContext.dispatch('setTokenExpire', +expirationDate - new Date().getTime())
        vuexContext.commit('setToken')
      }
    }
  })
}

export default createStore
