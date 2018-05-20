<template>
  <header class="header">
    <h1>Logo</h1>
    <p>Welcome: {{currentUser.username}}</p>
    <p>Status: {{status}}</p>
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
      logUserOut() {
        console.log('Log out')
      },
      logUserIn(){
        console.log('Login')
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
