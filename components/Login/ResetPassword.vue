<template>
  <div class="password-reset">
    <h3>Reset Password</h3>
    <form action="" id="password-reset-form">
      <fieldset>
        <label for="current-password">Current Password</label>
        <input type="text" id="current-password" v-model="currentPassword">
      </fieldset>
      <fieldset>
        <label for="new-password">New Password</label>
        <input type="text" id="new-password" v-model="newPassword">
      </fieldset>
      <button @click.prevent="resetPassword">Reset Password</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPassword: null,
      newPassword: null
    }
  },
  methods: {
    resetPassword() {
      this.$store.dispatch('resetPassword')
        .then(() => {
          console.log('Success')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
