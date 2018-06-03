<template>
  <form class="login-form text-center">
    <h3 class="login-form__title mb-sm"><span @click="onSetMode('log in')">Login</span> / <span @click="onSetMode('register')">Register</span></h3>
    <p>Mode: {{mode}}</p>
    <div class="login-form__input-group" v-if="!isLogin">
      <label class="login-form__label" for="firstName">First Name</label>
      <input class="login-form__input" id="firstName" type="text" v-model="firstName" placeholder="eg. John">
    </div>
    <div class="login-form__input-group" v-if="!isLogin">
      <label class="login-form__label" for="lastName">Last Name</label>
      <input class="login-form__input" id="lastName" type="text" v-model="lastName" placeholder="eg. Smith">
    </div>
    <div class="login-form__input-group">
      <label class="login-form__label" for="email">Email</label>
      <input class="login-form__input" id="email" type="text" v-model="email" placeholder="eg. username@gmail.com">
    </div>
    <div class="login-form__input-group" v-if="isLogin">
      <label class="login-form__label" for="password">Password</label>
      <input class="login-form__input" id="password" type="password" v-model="password" placeholder="Pssst... don't use 'password'">
    </div>
    <div class="input-group">
      <p v-text="toast.message"></p>
      <button class="login-form__button" @click.prevent="onSubmit">{{mode.toUpperCase()}}</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'logInForm',
    data() {
      return {
        isLogin: true,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        toast: {
          status: 'Good',
          message: 'This is some placeholder text'
        }
      }
    },
    methods: {
      onSubmit(){
        if(this.isLogin) {
          // Run method to start login auth
          console.log('Start login auth')
          this.$store.dispatch('authenticateUser', {
            email: this.email,
            password: this.password
          })
          .then((res) => {
            console.log('Login method: ' + res)
            this.$router.push('/dashboard/')
          })
          .catch(e => {
            console.log(e)
          })
        } else {
          // Run method to start user registration
          console.log('Start user reg')
          this.$store.dispatch('registerUser', {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
          })
          .then(res => {
            // console.log(res)
          })
          .catch()
        }
      },
      onSetMode(mode) {
        if (mode === 'log in') {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }
    },
    computed: {
      mode() {
        return this.isLogin ? 'log in' : 'register'
      }
    }
  }
</script>
