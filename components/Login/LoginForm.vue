<template>
  <div>
    <h3>Login</h3>
    <form class="login-form text-center">
      <div class="login-form__input-group" :class="{invalid: $v.user.email.$error}">
        <label class="login-form__label" for="email">Email</label>
        <input class="login-form__input" id="email" type="text" v-model="user.email" placeholder="eg. username@gmail.com" @blur="$v.user.email.$touch()">
      </div>
      <div class="login-form__input-group" :class="{invalid: $v.user.password.$error}">
        <label class="login-form__label" for="password">Password</label>
        <input class="login-form__input" id="password" type="password" v-model="user.password" placeholder="Pssst... don't use 'password'" @blur="$v.user.password.$touch()">
      </div>
      <div class="input-group">
        <button class="login-form__button" @click.prevent="submitLogin" :disabled="$v.$invalid">Login</button>
      </div>
      <button @click.prevent="$emit('forgotPassword')">I forgot my password!</button>
      <toast :toast="toast"></toast>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import Toast from '~/components/Base/Toast.vue'

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      toast: {
        status: null,
        message: null
      }
    }
  },
  computed: {
    formValid() {
      return true
    }
  },
  components: {
    toast: Toast
  },
  methods: {
      submitLogin() {
        this.$store.dispatch('login', this.user)
          .then(user => {
            console.log('Successful login!')
            this.$router.push('/dashboard/events')
          })
          .catch(e => {
            if (!e.response) {
              this.toast = {
                status: 'error',
                message: 'Cannot connect to server'
              }
            } else {
              this.toast = {
                status: 'error',
                message: e.response.data.message
              }
            }
            setTimeout(() => {
              this.toast = {
                status: null,
                message: null
              }
            }, 2000)
          })
      },
  },
  validations: {
    user: {
      email: {
        required: required,
        email: email
      },
      password: {
        required: required,
        minLength: minLength(6)
      }
    }
  }
}
</script>

<style scoped>
.invalid {
  border: red solid 1px;
}

.invalid label {
  color: red;
}
</style>
