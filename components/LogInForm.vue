<template>
  <form class="login-form text-center">
    <h3 class="login-form__title mb-sm"><span @click="onSetMode('login')">Login</span> / <span @click="onSetMode('register')">Register</span></h3>
    <p>Mode: {{mode}}</p>
    <div class="login-form__input-group">
      <label class="login-form__label" for="email">Email</label>
      <input class="login-form__input" id="email" type="text" v-model="email" placeholder="eg. username@gmail.com">
    </div>
    <div class="login-form__input-group">
      <label class="login-form__label" for="password">Password</label>
      <input class="login-form__input" id="password" type="password" v-model="password">
    </div>
    <div class="input-group">
      <button class="login-form__button" @click.prevent="onSubmit">Login</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'logInForm',
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
        .then(() => {
          this.$router.push('/dashboard/')
        })
        .catch(e => {
          console.log(e)
        })
      },
      onSetMode(mode) {
        if (mode === 'login') {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }
    },
    computed: {
      mode() {
        return this.isLogin ? 'login' : 'register'
      }
    }
  }
</script>
