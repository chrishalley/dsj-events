<template>
  <div>
    <h1>Click here to log in:</h1>
    <button @click="goToLogin">Log in</button>
<<<<<<< HEAD
    <reset-password></reset-password>
=======
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253
  </div>
</template>

<script>
<<<<<<< HEAD
  import resetPassword from '~/components/Login/ResetPassword.vue'
=======

>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253

  export default {
    data() {
      return {}

    },
    methods: {
      goToLogin() {
        this.$router.push('/login/')
      }
    },
<<<<<<< HEAD
    // layout: 'admin',
    components: {
      resetPassword
    }
=======
    // layout: 'admin'
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253
  }
</script>
