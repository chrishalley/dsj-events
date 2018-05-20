import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: {
        loggedIn: false,
        username: ''
      }
    },
    mutations: {
      // createNewUser(state, payload) {
      //   console.log(payload)
      // },
      setUser(state, payload) {
        state.user.username = payload.email
        state.user.loggedIn = true
      }
    },
    getters: {
      user(state) {
        return state.user
      }
    },
    actions: {
      authenticateUser(vuexContext, authData) {
        let authURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.fbAPIKey
        if (!authData.isLogin) {
          authURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.fbAPIKey
        }
        this.$axios.$post(authURL, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res)
          vuexContext.commit('setUser', res)
        })
        .catch(e => {
          console.log(e)
        })
      }
    }
  })
}

export default createStore
