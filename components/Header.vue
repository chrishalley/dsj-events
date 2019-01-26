<template>
  <header class="header">
    <h1 class="header__page-title">Page Title</h1>
    <!-- <p v-if="currentUser !== null">Welcome: {{currentUser.firstName}} ({{currentUser.email}})</p>
    <p>Status: {{status}}</p> -->
    <ul class="header__nav">
      <AppNavLink :linkData="navLink" v-for="(navLink, i) in navLinks" :key=i></AppNavLink>
    </ul>
  </header>
</template>

<script>
  import jwt from 'jsonwebtoken'
  import AppNavLink from '~/components/Base/AppNavLink.vue'
  export default {
    name: 'Header',
    data() {
      return {
        timeToLogout: null,
        navLinks: []
      }
    },
    methods: {
      logUserOut() {
        this.$store.dispatch('logUserOut')
      },
      pushToLoginPage() {
        if (this.$route.name !== 'login') {
          console.log(this.$route.name)
          this.$router.push('/login');
        }
      },
      calcTimeToLogout() {
        this.timeToLogout = Math.floor(((this.logoutTime * 1000) - new Date().getTime()) / 1000)
      },
      setNavLinks() {
        this.navLinks = [
          {
            text: 'Events',
            route: '/',
            icon: 'calendar',
            type: 'nuxtLink'
          },
          {
            text: 'Profile',
            route: '/dashboard/users',
            icon: 'person',
            type: 'nuxtLink',
            condition: this.currentUser !== null
          },
          {
            text: 'Log In',
            icon: 'login',
            clickEvent: this.pushToLoginPage,
            condition: this.currentUser === null
          },
          {
            text: 'Log Out',
            icon: 'login',
            clickEvent: this.logUserOut,
            condition: this.currentUser !== null
          }
        ]
      }
    },
    computed: {
      currentUser: {
        get: function() {
          return this.$store.getters.currentUser
        },
        set: function() {
          this.setNavLinks()
        }
      },
      // currentUser() {
      //   return this.$store.getters.currentUser
      // },
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
    components: {
      AppNavLink
    },
    created() {
      setInterval(() => {
        this.calcTimeToLogout()
      }, 1000)
      this.setNavLinks()
    }
  }
</script>
