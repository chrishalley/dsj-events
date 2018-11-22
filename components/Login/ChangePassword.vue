<template>
  <div class="password-change">
    <h3>Change Password</h3>
    <form action="" id="password-change-form">
      <fieldset>
        <label for="current-password">Current password</label>
        <input type="text" id="current-password" v-model="currentPassword">
      </fieldset>
      <fieldset>
        <label for="new-password">New password</label>
        <input type="text" id="new-password" v-model="newPassword">
      </fieldset>
      <fieldset :class="{invalid: $v.newPasswordConfirm.$error}">
        <label for="new-password">Confirm new password</label>
        <input type="text" id="new-password-confirm" v-model="newPasswordConfirm" @blur="$v.newPasswordConfirm.$touch()">
      </fieldset>
      <button @click.prevent="changePassword" :disabled="$v.$invalid">Change Password</button>
    </form>
  </div>
</template>

<script>
import {required, minLength, sameAs} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      currentPassword: null,
      newPassword: null,
      newPasswordConfirm: null
    }
  },
  methods: {
    changePassword() {
      this.$store.dispatch('changePassword', {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      })
        .then(() => {
          console.log('Success')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },
  validations: {
    currentPassword: {
      required,
      minLength: minLength(6)
    },
    newPassword: {
      required,
      minLength: minLength(6)
    },
    newPasswordConfirm: {
      required,
      sameAsPassword: sameAs('newPassword')
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
