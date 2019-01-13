<template>
  <header class="header">
    <h1 class="header__page-title">Page Title</h1>
    <!-- <p v-if="currentUser !== null">Welcome: {{currentUser.firstName}} ({{currentUser.email}})</p>
    <p>Status: {{status}}</p> -->
    <ul class="header__nav">
      <li class="header__nav-item">
        <p>Time to logout: {{timeToLogout}}</p>
      </li>
      <li class="header__nav-item">
        <nuxt-link to="/">Events</nuxt-link>
      </li>
      <li class="header__nav-item" v-if="currentUser">
        <nuxt-link to="/dashboard/users/">Profile</nuxt-link>
      </li>
      <li class="header__nav-item" v-if="currentUser">
        <button @click="logUserOut">Log Out</button>
      </li>
      <li class="header__nav-item" v-if="!currentUser">
        <button @click="pushToLoginPage">Log In</button>
      </li>
      <button @click="calcTimeToLogout">Calc</button>
    </ul>
  </header>
</template>

<script>
  import jwt from 'jsonwebtoken'
  export default {
    name: 'Header',
    data() {
      return {
        timeToLogout: null
      }
    },
    methods: {
      logUserOut() {
        this.$store.dispatch('logUserOut')
      },
      pushToLoginPage() {
        this.$router.push('/login');
      },
      calcTimeToLogout() {
        this.timeToLogout = Math.floor(((this.logoutTime * 1000) - new Date().getTime()) / 1000)
      }
    },
    computed: {
      currentUser() {
        return this.$store.getters.currentUser
      },
      authToken() {
        return this.$store.getters.getAuthToken
      },
      status() {
        return this.$store.getters.isUserAuthenticated ? 'Logged in' : 'Logged out'
      },
      logoutTime() {
        if (this.authToken) {
          return jwt.decode(this.authToken).exp
        }
      }
    },
    created() {
      setInterval(() => {
        this.calcTimeToLogout()
      }, 1000)
    }
  }
</script>
