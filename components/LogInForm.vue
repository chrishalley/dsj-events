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
        isLogin: true,
        toast: {
          status: null,
          message: null
        }
      }
    },
    computed: {
      mode() {
        return this.isLogin ? 'Login' : 'Register'
      }
    },
    methods: {
      onSubmit(user){
        if(this.isLogin) { // Check if mode is login or register
          this.$store.dispatch('checkUserStatus', user) // Check if user has not been suspended or deleted
            .then((res) => {
              return this.$store.dispatch('authenticateUser', user) // Run authentication on username and password, set cookies and tokens
            })
            .then(() => {
              setTimeout(() => {
                console.log('This: ', this)
              }, 2000)
              console.log('Router push')
              this.$router.push('/dashboard/users') // Push user into dashboard
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
