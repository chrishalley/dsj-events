import Vuex from 'vuex'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

import utils from '../utils/utils'

import firebase from '~/plugins/firebase'
import { auth } from '~/plugins/firebase'
import cloudinary from 'cloudinary-core'
import crypto from 'crypto-js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      currentUser: null,
      dsjEvents: [],
      editEvent: null
    },
    mutations: {
      setCurrentUser(state, userData) {
        console.log('setCurrentUser() ', userData)
        state.currentUser = userData
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
      login(vuexContext, authData) { // Check status of existing user account before allowing login
        return new Promise((resolve, reject) => {
          this.$axios.post('http://localhost:3030/users/login', authData)
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
        console.log('setCurrentUser action', userData)
        vuexContext.commit('setCurrentUser', userData)
      },
      resetPassword(vuexContext, payload) {
        this.$axios.post('http://localhost:3030/users/:id/set-password', payload)
          .then(() => console.log(success))
          .catch((e) => console.log(e))
      },
      initAuth(vuexContext, req) { // Runs between admin route changes to check validity of token and tokenExpiryDate
        let token
        console.log('initAuth() started');
        
        // If process is running on server
        if (req) {
          console.log('Server process');
          // Check for existence of Cookie
          if (req.headers.cookie) {
            token = jwt.decode((utils.tokenFromCookie('dsj_access', req.headers.cookie)).value)
          }
        }  
        // If process is running on client
        else {
          console.log('Client process');
          token = jwt.decode(Cookie.get('dsj_access'))
        }

        // Check we have a valid access token
        console.log('token: ', token);
        if (new Date().getTime() > parseInt(token.expiresAt) || !token) {
          // token is expired
          console.log('token is expired')
          vuexContext.dispatch('logUserOut')
          return
        } else {
          console.log('token is valid');
          return vuexContext.dispatch('getUserById', token.id)
            .then(user => {
              vuexContext.commit('setCurrentUser', user)
            })
            .catch(e => {
              console.log(e)
            })
        }
        // if (req) { // If process is running on server
        //   if (!req.headers.cookie) {
        //     return
        //   }
        //   token = req.headers.cookie.split(';').find(c => c.trim().startsWith('token=')).split('=')[1]
        //   if (!token) {
        //     return
        //   }
        //   tokenExpirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('tokenExpirationDate=')).split('=')[1]
        // } else {
        //   token = Cookie.get('dsj_access')
        //   decoded = jwt.decode(token)
        //   console.log('DECODED: ', decoded)
        //   tokenExpiration = decoded.iat * 1000
        //   console.log(new Date().getTime())
        // }       
        // // If token has expired or there is no token, then return
        // if (new Date().getTime() > Number.parseInt(tokenExpiration) || !token) {
        //   console.log('Token expired or no token')
        //   return
        // }
        // // If process is running in browser, set localStorage token and expiry
        // if (process.client) {
        //   localStorage.setItem('token', token)
        //   localStorage.setItem('tokenExpirationDate', tokenExpirationDate)
        // } else {
        //   // If process is running on server, set Cookie token and expiry
        //   Cookie.set('token', token)
        //   Cookie.set('tokenExpirationDate', tokenExpirationDate)
        // }
        // vuexContext.commit('setToken', token)
      },
      getUserById(vuexContext, id) {
        return new Promise((resolve, reject) => {
          this.$axios.get(`http://localhost:3030/users/${id}`)
            .then(res => {
              console.log('res.data: ', res.data);
              resolve(res.data)
            })
            .catch(e => {
              reject(e);
            })
        })
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
      logUserOut(vuexContext) {
        // Clear Cookie
        Cookie.remove('dsj_access')
        // Unset Current User 
        vuexContext.commit('setCurrentUser', null)
        // Push to login
        this.$router.push('/login/')
      },
      // authenticateUser(vuexContext, authData) {
      //   return new Promise((resolve, reject) => {
      //     return auth.signInWithEmailAndPassword(authData.email, authData.password)
      //     .then((res) => {
      //       Cookie.set('dsj_uid', auth.currentUser.uid)
      //       vuexContext.commit('setCurrentUser', res.user)
      //       resolve()
      //     })
      //     .catch((e) => {
      //       console.log(e)
      //       reject()
      //     })
      //   })
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
      
      
      applyUser(vuexContext, userData) {
        return new Promise((resolve, reject) => {
          this.$axios.post('http://localhost:3030/users/register', userData)
          .then(res => {
            console.log(res)
            resolve()
          })
          .catch(e => {
            reject(e);
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
        if (context.req) {
          console.log('REQ*** ', context.req)
          if (!context.req.headers.cookie) {
            return
          } else {
            uidCookie = parseCookie(context, 'dsj_access')
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
      }
      // addCookie(context, payload) {
      //   Cookie.set('random', payload)
      // }
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
