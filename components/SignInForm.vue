<template>
  <form class="col-1-of-2 login-form">
    <input id="email" type="text" v-model="email" placeholder="eg. username@gmail.com">
    <label for="email">Email</label>
    <input id="password" type="password" v-model="password">
    <label for="password">Password</label>
    <button @click.prevent="onSubmit">Login</button>
  </form>
</template>

<script>
  export default {
    name: 'signInForm',
    data() {
      return {
        isLogin: true,
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit(){
        this.$store.dispatch('authenticateUser', {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password
        })
        .then(console.log('Action dispatched'))
        .catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>
