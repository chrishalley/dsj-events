<template>
  <div>
    <h3 class="login-form__title mb-sm"><span @click="isLogin = !isLogin">Login</span> / <span @click="isLogin = !isLogin">Register</span></h3>
    <login-form :mode="mode" v-if="isLogin" @submitLogin="onSubmit"></login-form>
    <register-form :mode="mode" v-if="!isLogin" @submitRegistration="onSubmit"></register-form>
  </div>
</template>

<script>
  import LoginForm from '~/components/Login/LoginForm.vue'
  import RegisterForm from '~/components/Login/RegisterForm.vue'

  export default {
    name: 'logInForm',
    components: {
      LoginForm,
      RegisterForm
    },
    data() {
      return {
        isLogin: true
      }
    },
    computed: {
      mode() {
        return this.isLogin ? 'Login' : 'Register'
      }
    },
    methods: {
      onSubmit(user){
        if(this.isLogin) {
          this.$store.dispatch('checkUserStatus', user)
            .then((res) => {
              console.log('Login successful')
              this.$router.push('/dashboard/users')
              // console.log('onSubmit response: ', res)
            })
            .catch((e) => {
              console.log(e)
            })
        } else {
          // Run method to start user registration
          this.$store.dispatch('applyUser', user)
        }
      }
    }
  }
</script>
