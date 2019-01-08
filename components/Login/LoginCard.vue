<template>
  <div class="card">
    <login-form :mode="mode" v-if="!forgotPasswordFlag" @submitLogin="onSubmit" @forgotPassword="forgotPasswordFlag = true" :toast="toast"></login-form>
    <ResetPassword v-if="forgotPasswordFlag" @cancelResetPassword="forgotPasswordFlag = false"></ResetPassword>
  </div>
</template>

<script>
  import LoginForm from '~/components/Login/LoginForm.vue'
  import RegisterForm from '~/components/Login/RegisterForm.vue'
  import ResetPassword from '~/components/Login/ResetPassword.vue'

  export default {
    name: 'logInForm',
    components: {
      LoginForm,
      RegisterForm,
      ResetPassword
    },
    data() {
      return {
        isLogin: true,
        forgotPasswordFlag: false,
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
                // this.$router.push('/dashboard/users') // Push user into dashboard
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
        } 
        // else {
        //   // Run method to start user registration
        //   this.$store.dispatch('applyUser', user)
        // }
      }
    }
  }
</script>
