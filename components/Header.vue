<template>
  <header class="header">
    <h1 class="header__page-title">Page Title</h1>
    <!-- <p v-if="currentUser !== null">Welcome: {{currentUser.firstName}} ({{currentUser.email}})</p>
    <p>Status: {{status}}</p> -->
    <ul class="header__nav">
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
    </ul>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    methods: {
      logUserOut() {
        this.$store.dispatch('logUserOut')
      },
      pushToLoginPage() {
        this.$router.push('/login');
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
