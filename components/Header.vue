<template>
  <header class="header">
    <h1>Logo</h1>
    <p v-if="currentUser !== null">Welcome: {{currentUser.email}}</p>
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
    <button @click="logUserOut">Log Out</button>
    <button @click="postToAPI"></button>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    methods: {
      logUserOut() {
        this.$store.dispatch('logUserOut')
      },
      postToAPI() {
        this.$axios.post('http://localhost:3030/users', {
          email: "yaz@yaz.com",
          password: "password5678"
        })
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
      }
    },
    computed: {
      currentUser() {
        return this.$store.getters.currentUser
      },
      status() {
        return this.$store.getters.isUserAuthenticated ? 'Logged in' : 'Logged out'
      }
    }
  }
</script>
