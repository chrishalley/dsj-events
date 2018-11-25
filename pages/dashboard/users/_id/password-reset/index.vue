<template>
  <div>
    <h1>Password Reset</h1>
    <div class="card" v-if="idValid && tokenValid">
      <h2>Reset Approved</h2>
      <form action="">
        <fieldset :class="{invalid: $v.newPassword.$error}">
          <label for="new-password">Choose a new password</label>
          <input type="text" id="new-password" v-model="newPassword" autofocus>
        </fieldset>
        <fieldset :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm new password</label>
          <input type="text" id="confirm-password" v-model="confirmPassword">
        </fieldset>
        <button :disabled="$v.$invalid" @click.prevent="resetPassword">Set new password</button>
      </form>
    </div>
    <div  class="card" v-if="(!idValid || !tokenValid) && !newLinkFlag">
      <h2>Reset Denied</h2>
      <p>Your password reset link has expired.</p>
      <button @click="newLinkFlag = !newLinkFlag">Request new link</button>
    </div>
    <div class="card" v-if="newLinkFlag">
      <ResetPassword @cancelResetPassword="newLinkFlag = false"></ResetPassword>
    </div>
  </div>
</template>

<script>
import ResetPassword from '~/components/Login/ResetPassword.vue'
import {required, minLength, sameAs} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      idValid: false,
      tokenValid: false,
      newLinkFlag: false,
      newPassword: null,
      confirmPassword: null
    }
  },
  layout: 'default',
  components: {
    ResetPassword
  },
  validations: {
    newPassword: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      required,
      minLength: minLength(6),
      confirmPassword: sameAs('newPassword')
    }
  },
  methods: {
    resetPassword() {
      const id = this.$route.params.id;
      console.log('resetPassword()')
      this.$store.dispatch('resetPasswordById', {id, newPassword: this.newPassword})
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  asyncData(context) {
    const payload = {
      _id: context.route.params.id,
      token: context.route.query.token
    }

    return context.$axios.post(`${process.env.baseURL}/users/verify-password-reset-token`, payload)
      .then(res => {
        return {idValid: true, tokenValid: true}
      })
      .catch(e => {
        console.log('API fail')
        console.log(e)
        return
      }) 
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