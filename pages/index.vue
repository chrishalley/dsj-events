<template>
  <div>
    <h1>Click here to log in:</h1>
    <button @click="goToLogin">Log in</button>

    <reset-password></reset-password>
  </div>
</template>

<script>

  import resetPassword from '~/components/Login/ResetPassword.vue'

  export default {
    data() {
      return {}

    },
    methods: {
      goToLogin() {
        this.$router.push('/login/')
      }
    },

    // layout: 'admin',
    components: {
      resetPassword
    }

  }
</script>
