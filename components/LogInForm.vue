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
    <div class="login-form__toast">
      <p>{{toast.message}}</p>
    </div>
    <div class="input-group">
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
          message: ''
        }
      }
    },
    methods: {
      onSubmit(){
        if(this.isLogin) {
          // Run method to start login auth
          this.$store.dispatch('authenticateUser', {
            email: this.email,
            password: this.password
          })
          .then(res => {
            this.toast = {
              status: 'Good',
              message: 'Your story checks out'
            }
            let vm = this
            setTimeout(() => {
              vm.toast = {
                status: '',
              message: ''
              }
              vm.$router.push('/dashboard/')
            }, 3000)
          })
          .catch(e => {
            this.toast = {
              status: 'Bad',
              message: e.code
            }
            let vm = this
            setTimeout(() => {
              vm.toast = {
                status: '',
              message: ''
              }
            }, 3000)
          })
        } else {
          // Run method to start user registration
          this.$store.dispatch('applyUser', {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
          })
          .then(res => {
            console.log(res)
          })
          .catch(e => {
            console.log(e)
          })
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
