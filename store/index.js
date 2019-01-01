import Vuex from 'vuex'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import utils from '../utils/utils'

const createStore = () => {
  return new Vuex.Store({
    state: {
      currentUser: null,
      globalToast: {
        status: null,
        heading: null,
        message: null
      },
      events: [
        {
          title: 'Event One',
          description: 'Event one description',
          time: 'Tuesday',
          id: '1'
        },
        {
          title: 'Event Two',
          description: 'Event two description',
          time: 'Wednesday',
          id: '2'
        },
        {
          title: 'Event Three',
          description: 'Event two description',
          time: 'Thursday',
          id: '3'
        },
    ]
    },
    mutations: {
      setCurrentUser(state, userData) {
        state.currentUser = userData
      },
      addEvent(state, dsjEvent) {
        state.dsjEvents.push({dsjEvent})
      },
      setGlobalToast(state, payload) {
        state.globalToast.status = payload.status
        state.globalToast.message = payload.message
      }
    },
    getters: {
      currentUser(state) {
        return state.currentUser
      },
      isUserAuthenticated(state) {
        return state.currentUser != null
      },
      getEvents(state) {
        return state.events
      },
      getGlobalToast(state) {
        return state.globalToast
      }
    },
    actions: {
      login(vuexContext, authData) { // Check status of existing user account before allowing login
        return new Promise((resolve, reject) => {
          this.$axios.post(`${process.env.baseURL}/auth/login`, authData)
          .then(res => {
            vuexContext.dispatch('setCurrentUser', res.data)
            const token = res.data.tokens.find(cur => {
              return cur.access === "admin" || cur.access === "super-admin"
            }).token
            Cookie.set('cibolo_access', token)
            resolve()
          })
          .catch((e) => {
            if (!e.response) {
              const error = {
                status: 'error',
                message: 'Cannot connect to server'
              }
              vuexContext.dispatch('setGlobalToast', error)
            }
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
        let cookie, token, decoded

        if (req) { // If process is running on server
          if (req.headers.cookie) {
            cookie = utils.tokenFromCookie('cibolo_access', req.headers.cookie)
            if (!cookie) {
              return
            }
            token = cookie.value
            if (!token) {
              return
            }
            decoded = jwt.decode(token)
          }
        } else { // If process is running on client
          token = Cookie.get('cibolo_access')
          decoded = jwt.decode(token)
          if (!decoded) {
            return
          }
        }
        if (new Date().getTime() > parseInt(decoded.exp * 1000) || !decoded) { // if token is expired
          vuexContext.dispatch('logUserOut')
          return
        } else { // if token is valid
          this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          return vuexContext.dispatch('getUserById', decoded.id)
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
      getEvents(vuexContext) {
        return vuexContext.getters.getEvents

        // return new Promise((resolve, reject) => {
        //   return this.$axios.get(`${process.env.baseURL}/events`)
        //   .then((res) => {
        //     resolve(res)
        //   })
        //   .catch((e) => {
        //     reject(e)
        //   })
        // })
      },
      logUserOut(vuexContext) {
        Cookie.remove('cibolo_access')
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
        return this.$axios.put(`${process.env.baseURL}/users/${user._id}`, user)
          .then(res => {
            return res
          })
          .catch(e => console.log(e))
      },
      deleteUser(vuexContext, id) {
        this.$axios.delete(`${process.env.baseURL}/users/${id}`)
          .then(res => {
            return
          })
          .catch(e => console.log(e))
      },
      resetPasswordById(vuexContext, payload) {
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
      setGlobalToast(vuexContext, payload) {
        vuexContext.commit('setGlobalToast', payload)
        setTimeout(() => {
          vuexContext.commit('setGlobalToast', {
            status: null,
            message: null
          })
        }, 4000)
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
      createEvent(vuexContext, event) {
        console.log('createEvent action')
        console.log(event)
        this.$axios.post(`${process.env.baseURL}/events`, event)
          .then(res => {
            console.log(res)
          })
          .catch(e => {
            console.log(e)
          })
      },
      async nuxtServerInit(vuexContext, context) { // Loads current user data on initialisation
        if (context.req) {
          vuexContext.dispatch('initAuth', context.req)
        }
        // const token = Cookie.get('')
        // this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        // console.log('vuexContext: ', vuexContext)
        // console.log('context: ', context)
        // let uidCookie
        // if (context.req) {
        //   if (context.req.headers.cookie) {
            
        //   }
        //   console.log(context.req)
        //   console.log('nextServerInit() on server')
        //   console.log('headers: ', context.req.headers)
        //   // this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //   console.log(this.$axios.defaults.headers.common)
        // } else {
        //   console.log('nuxtServerInit() on client')
        // }
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
