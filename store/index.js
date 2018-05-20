import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      currentUser: {
        loggedIn: false,
        username: ''
      }
    },
    mutations: {
      // createNewUser(state, payload) {
      //   console.log(payload)
      // },
      setCurrentUser(state, payload) {
        state.currentUser.username = payload.email
        state.currentUser.loggedIn = true
      }
    },
    getters: {
      currentUser(state) {
        return state.currentUser
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
          this.$router.push('/dashboard/')
          vuexContext.commit('setCurrentUser', res)
        })
        .catch(e => {
          console.log(e)
        })
      }
    }
  })
}

export default createStore
