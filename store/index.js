import Vuex from 'vuex'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import utils from '../utils/utils'

const createStore = () => {
  return new Vuex.Store({
    state: {
      currentUser: null
    },
    mutations: {
      setCurrentUser(state, userData) {
        state.currentUser = userData
      },
      addEvent(state, dsjEvent) {
        state.dsjEvents.push({dsjEvent})
      }
    },
    getters: {
      currentUser(state) {
        return state.currentUser
      },
      isUserAuthenticated(state) {
        return state.currentUser != null
      },
      getDsjEvents(state) {
        return state.dsjEvents
      }
    },
    actions: {
      login(vuexContext, authData) { // Check status of existing user account before allowing login
        return new Promise((resolve, reject) => {
          console.log(process.env.baseURL);
          this.$axios.post(`${process.env.baseURL}/users/login`, authData)
          .then(res => {
            vuexContext.dispatch('setCurrentUser', res.data)
            const token = res.data.tokens.find(cur => {
              return cur.access = "auth"
            }).token
            Cookie.set('dsj_access', token);
            resolve()
          })
          .catch((e) => {
            reject(e)
          })
        })
      },
      setCurrentUser(vuexContext, userData) { // Commit mutation to set current user data in Vuex store
        vuexContext.commit('setCurrentUser', userData)
      },
      resetPassword(vuexContext, email) {
        console.log('EMAIL: ', email)
        this.$axios.post(`${process.env.baseURL}/users/reset-password`, {email})
          .then((res) => console.log('success: ', res))
          .catch((e) => console.log(e))
      },
      changePassword(vuexContext, payload) {
        return new Promise((resolve, reject) => {
          payload._id = vuexContext.state.currentUser._id
          this.$axios.post(`${process.env.baseURL}/users/${payload._id}/set-password`, payload)
            .then((res) => {
              resolve(res)
            })
            .catch(e => {
              reject(e)
            })
        })
      },
      initAuth(vuexContext, req) { // Runs between admin route changes to check validity of token and tokenExpiryDate
        let token
        
        // If process is running on server
        if (req) {
          // Check for existence of Cookie
          if (req.headers.cookie) {
            const rawToken = utils.tokenFromCookie('dsj_access', req.headers.cookie)
            if (!rawToken) {
              return
            }
            token = jwt.decode(rawToken.value);
          }
        }  
        // If process is running on client
        else {
          console.log('process client');
          token = jwt.decode(Cookie.get('dsj_access'))
          if (!token) {
            return
          }
        }

        // Check we have a valid access token
        if (new Date().getTime() > parseInt(token.expiresAt) || !token) {
          // token is expired

          vuexContext.dispatch('logUserOut')
          return
        } else {

          return vuexContext.dispatch('getUserById', token.id)
            .then(user => {
              vuexContext.commit('setCurrentUser', user)
            })
            .catch(e => {
              console.log(e)
            })
        }
      },
      getUserById(vuexContext, id) {
        return new Promise((resolve, reject) => {
          this.$axios.get(`${process.env.baseURL}/users/${id}`)
            .then(res => {
              resolve(res.data)
            })
            .catch(e => {
              reject(e);
            })
        })
      },
      getEventData() {
        return new Promise((resolve, reject) => {
          return this.$axios.get(`${process.env.baseURL}/events`)
          .then((res) => {
            resolve(res)
          })
          .catch((e) => {
            reject(e)
          })
        })
      },
      logUserOut(vuexContext) {
        Cookie.remove('dsj_access')
        vuexContext.commit('setCurrentUser', null)
        this.$router.push('/login/')
      },
      addUser(vuexContext, userData) {
        return new Promise((resolve, reject) => {
          this.$axios.post(`${process.env.baseURL}/users`, userData)
          .then((res)=> {
            resolve(res.data)
          })
          .catch(e => {
            reject(e);
          })
        })
      },
      updateUser(vuexContext, user) {
        console.log(user._id)
        return this.$axios.put(`${process.env.baseURL}/users/${user._id}`, user)
          .then(res => {
            return res
          })
          .catch(e => console.log(e))
      },
      deleteUser(vuexContext, id) {
        console.log('vuex deleteUser()')
        this.$axios.delete(`${process.env.baseURL}/users/${id}`)
          .then(res => {
            return
          })
          .catch(e => console.log(e))
      },
      resetPasswordById(vuexContext, payload) {
        console.log('resetPasswordById()')
        console.log(payload)
        return new Promise((resolve, reject) => {
          this.$axios.post(`${process.env.baseURL}/users/${payload.id}/resetPassword`, {newPassword: payload.newPassword})
            .then(res => {
              resolve(res)
            })
            .catch(e => {
              reject(e)
            })
        })
      },
      saveImageToCloudinary(vuexContext, imageUrl) {
        // console.log(crypto.SHA1)
        // this.$axios.post('https://api.cloudinary.com/v1_1/dtn26lvux/image/upload', {
        //   file: imageUrl,
        //   api_key: '451276742949277',
        //   timestamp: new Date().getTime(),
        //   signature: ''
        // })
        // .then((res) => {
        //   console.log(res)
        // })
        // .catch(e => console.log(e))
      },
      async nuxtServerInit(vuexContext, context) { // Loads current user data on initialisation
        let uidCookie
        // if (context.req) {
        //   console.log('REQ*** ', context.req)
        //   if (!context.req.headers.cookie) {
        //     return
        //   } else {
        //     uidCookie = parseCookie(context, 'dsj_access')
        //     await context.app.$axios.get(`${process.env.baseURL}/users/${uidCookie}.json`)
        //     .then((res) => {
        //       vuexContext.commit('setCurrentUser', res.data)
        //     })
        //     .catch((e) => {
        //       console.log('Error: ', e)
        //     })
        //   }
        // } else {
        //   return
        // }
      }
      // addCookie(context, payload) {
      //   Cookie.set('random', payload)
      // }
    }
  })
}

export default createStore
