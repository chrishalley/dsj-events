<template>
  <div>
    <h3 class="login-form__title mb-sm"><span @click="isLogin = !isLogin">Login</span> / <span @click="isLogin = !isLogin">Register</span></h3>
    <login-form :mode="mode" v-if="isLogin" @submitLogin="onSubmit" :toast="toast"></login-form>
    <register-form :mode="mode" v-if="!isLogin" @submitRegistration="onSubmit" :toast="toast"></register-form>
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
          status: 'warning',
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
              this.toast = {
                status: 'good',
                message: 'User approved!'
              }
              setTimeout(() => {
                this.toast = {
                  status: 'warning',
                  message: null
                }
                this.$router.push('/dashboard/users') // Push user into dashboard
              }, 2000)
            })
            .catch((e) => {
              this.toast.status = 'error'
              if (e.response) {
                this.toast.message = e.response.data.error.message
              } else {
                this.toast.message = e
              }
              setTimeout(() => {
                this.toast.message = null
                this.toast.status = 'warning'
              }, 2000)
            })
        } else {
          // Run method to start user registration
          this.$store.dispatch('applyUser', user)
        }
      }
    }
  }
</script>
