import Vuex from 'vuex'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

import utils from '../utils/utils'

import cloudinary from 'cloudinary-core'


const createStore = () => {
  return new Vuex.Store({
    state: {
      currentUser: null,
      dsjEvents: [],
      editEvent: null
    },
    mutations: {
      setCurrentUser(state, userData) {
        state.currentUser = userData
      },
      addEvent(state, dsjEvent) {
        state.dsjEvents.push({dsjEvent})
      },
      setEditEvent(state, dsjEvent) {
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
      getDsjEvents(state) {
        return state.dsjEvents
      },
      getEditEvent(state) {
        return state.editEvent
      }
    },
    actions: {
      login(vuexContext, authData) { // Check status of existing user account before allowing login
        return new Promise((resolve, reject) => {
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
      resetPassword(vuexContext, payload) {
        this.$axios.post(`${process.env.baseURL}/users/:id/set-password`, payload)
          .then(() => console.log(success))
          .catch((e) => console.log(e))
      },
      initAuth(vuexContext, req) { // Runs between admin route changes to check validity of token and tokenExpiryDate
        let token
        
        // If process is running on server
        if (req) {

          // Check for existence of Cookie
          if (req.headers.cookie) {
            token = jwt.decode((utils.tokenFromCookie('dsj_access', req.headers.cookie)).value)
          }
        }  
        // If process is running on client
        else {

          token = jwt.decode(Cookie.get('dsj_access'))
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
        // Clear Cookie
        Cookie.remove('dsj_access')
        // Unset Current User 
        vuexContext.commit('setCurrentUser', null)
        // Push to login
        this.$router.push('/login/')
      },
      applyUser(vuexContext, userData) {
        return new Promise((resolve, reject) => {
          this.$axios.post(`${process.env.baseURL}/users/register`, userData)
          .then(res => {
            resolve()
          })
          .catch(e => {
            reject(e);
          })
        })
      },
      updateUser(vuexContext, payload) {
        this.$axios.put(`${process.env.baseURL}/users/${payload.id}`, payload.update)
          .then(res => {
            return
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
      registerUser(vuexContext, userData) {
        // firebase.database().ref('users/').push({
        //   firstName: userData.firstName,
        //   lastName: userData.lastName,
        //   email: userData.email,
        //   userStatus: 'Pending',
        //   applicationDate: (new Date()).toString(),
        //   userId: ''
        // })
        // .then(res => {
        //   console.log(res)
        //   let key = res.key
        //   firebase.database().ref('users/').child(key).update({
        //     userId: key
        //   })
        // })
        // .catch(e => {
        //   console.log(e)
        // })
      },
      approveUser(vuexContext, userData) {
        // // Create new user in Firebase Auth Dashboard
        // let tempUserKey = userData.userId
        // firebase.auth().createUserWithEmailAndPassword(userData.email, 'password')
        // .then((res) => {
        //   //Create matching user entry in Firebase Database
        //   firebase.database().ref('/users/' + res.user.uid).set({
        //     firstName: userData.firstName,
        //     lastName: userData.lastName,
        //     email: userData.email,
        //     userStatus: 'Approved',
        //     applicationDate: userData.applicationDate,
        //     approvedDate: new Date().toString(),
        //     userId: res.user.uid
        //   })
        //   // Delete old entry for pending user
        //   firebase.database().ref('/users/' + tempUserKey).remove()
        // })
        // .catch(e => {
        //   console.log(e)
        // })
      },
      suspendUser(vuexContext, userData) {
        // firebase.database().ref('/users/' + userData.userId).update({
        //   firstName: userData.firstName,
        //   lastName: userData.lastName,
        //   email: userData.email,
        //   userStatus: 'Suspended',
        //   applicationDate: userData.applicationDate,
        //   approvedDate: userData.approvedDate,
        //   userId: userData.userId
        // })
        // .then(() => {
        //   console.log('User suspended')
        // })
        // .catch(e => {
        //   console.log(e)
        // })
      },
      reinstateUser(vuexContext, userData) {
        // console.log(userData)
        // firebase.database().ref('/users/' + userData.userId).update({
        //   firstName: userData.firstName,
        //   lastName: userData.lastName,
        //   email: userData.email,
        //   userStatus: 'Approved',
        //   applicationDate: userData.applicationDate,
        //   approvedDate: userData.approvedDate,
        //   userId: userData.userId
        // })
        // .then(() => {
        //   console.log('User reinstated')
        // })
        // .catch(e => {
        //   console.log(e)
        // })
      },
      setTokenExpire(vuexContext, duration) {
        setTimeout(() => {
          console.log('setTokenExpire')
          vuexContext.commit('clearToken')
        }, duration * 1000)
      },
      getUserByEmail(vuexContext, user) {
        // return firebase.auth().fetchSignInMethodsForEmail(user.email)
        // .then((res) => {
        //   return res.length > 0
        // })
      },
      saveEvent(vuexContext, dsjEvent) {
        // return new Promise((resolve, reject) => {
        //   firebase.database().ref('/events/').push({
        //     title: dsjEvent.title,
        //     description: dsjEvent.description,
        //     startDateTime: dsjEvent.startDateTime,
        //     endDateTime: dsjEvent.endDateTime
        //   })
        //   .then((res) => {
        //     let key = res.key
        //     return firebase.database().ref('/events/').child(key).update({
        //       id: key
        //     })
        //   })
        //   .then(() => {
        //     vuexContext.commit('addEvent', dsjEvent)
        //     resolve()
        //   })
        //   .catch(() => {
        //     reject()
        //   })
        // })
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
      setEditEvent(vuexContext, dsjEvent) {
        console.log('setEditEvent() action')
        vuexContext.commit('setEditEvent', dsjEvent)
      },
      clearEditEvent(vuexContext) {
        console.log('clearEditEvent()')
        vuexContext.commit('clearEditEvent')
      },
      saveImageToCloudinary(vuexContext, imageUrl) {
        console.log(crypto.SHA1)
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
