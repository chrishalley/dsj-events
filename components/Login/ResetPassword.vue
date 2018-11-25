<template>
  <div class="password-reset">
    <h3>Reset Password</h3>
    <form action="" id="password-reset-form">
      <fieldset :class="{invalid: $v.email.error}">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email">
      </fieldset>
      <button @click.prevent="resetPassword" :disabled="$v.$invalid">Reset Password</button>
      <button @click.prevent="$emit('cancelResetPassword')">Cancel</button>
    </form>
  </div>
</template>

<script>
import {required, minLength, sameAs, email} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: null
    }
  },
  methods: {
    resetPassword() {
      this.$store.dispatch('resetPassword', this.email)
        .then(() => {
          console.log('Success')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },
  validations: {
    email: {
      required,
      minLength: minLength(6),
      email: email
    }
  }
}
</script>

<style scoped>
.invalid {
    border: red solid 1px;
}

.invalid label{
    color: red;
}
</style>
