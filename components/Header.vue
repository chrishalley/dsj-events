<template>
  <header class="header">
    <h1>Logo</h1>
    <p>Welcome: {{currentUser.username}}</p>
    <p>Status: {{status}}</p>
    <p>Token valid until: {{tokenExpiry()}}</p>
    <ul class="header__nav">
      <li class="header__nav-item">
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li class="header__nav-item">
        <nuxt-link to="/dashboard/events/">Events</nuxt-link>
      </li>
      <li class="header__nav-item">
        <nuxt-link to="/dashboard/users/">Users</nuxt-link>
      </li>
    </ul>
    <button @click="logUserIn">Log In</button>
    <button @click="logUserOut">Log Out</button>
    <button @click="vuexToken">Vuex Token</button>
    <button @click="localToken">Local Token</button>
    <button @click="tokenExpiry">Token Expiry</button>
    <button @click="hasTokenExpired">Expired?</button>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {

      }
    },
    methods: {
      logUserIn(){
        console.log('Login button')
        this.$router.push('/login/')
      },
      logUserOut() {
        this.$store.dispatch('logUserOut')
        console.log('user log out (method)')
      },
      vuexToken() {
        let vuexToken = this.$store.getters.vuexToken
        console.log(vuexToken)
      },
      localToken() {
        let localToken = localStorage.getItem('token')
        console.log(localToken)
      },
      tokenExpiry() {
        // let tokenExpiry = new Date(parseInt(localStorage.getItem('tokenExpiration'), 10))
        // return tokenExpiry
      },
      hasTokenExpired() {
        console.log(new Date().getTime() > localStorage.getItem('tokenExpiration'))
      }
    },
    computed: {
      currentUser() {
        return this.$store.getters.currentUser
      },
      status() {
        return this.$store.getters.currentUser.loggedIn ? 'Logged in' : 'Logged out'
      }
    }
  }
</script>
