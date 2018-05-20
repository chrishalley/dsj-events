<template>
  <header class="header">
    <h1>Logo</h1>
    <p>Welcome: {{user.username}}</p>
    <p>Status: {{status}}</p>
    <ul class="header__nav">
      <li class="header__nav-item">Home</li>
      <li class="header__nav-item">Home</li>
      <li class="header__nav-item">Home</li>
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
      user() {
        return this.$store.getters.user
      },
      status() {
        return this.$store.getters.user.loggedIn ? 'Logged in' : 'Logged out'
      }
    }
  }
</script>
