<template>
  <div>
    <h1>Click here to log in:</h1>
    <button @click="goToLogin">Log in</button>

    <change-password></change-password>
  </div>
</template>

<script>

  import changePassword from '~/components/Login/ChangePassword.vue'

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
      changePassword
    }

  }
</script>
