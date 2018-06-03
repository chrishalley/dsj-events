<template>
  <div>
    <h1>Click here to log in:</h1>
    <button @click="goToLogin">Log in</button>
  </div>
</template>

<script>


  export default {
    data() {
      return {}

    },
    methods: {
      goToLogin() {
        this.$router.push('/login/')
      }
    }
  }
</script>
