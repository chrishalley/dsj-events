<template>
  <div class="new-user-card">
    <form class="add-user-form text-center">
      <h3>Add user</h3>
      <div class="add-user-form__input-group" :class="{invalid: $v.user.firstName.$error}">
        <label class="add-user-form__label" for="firstName">First Name</label>
        <input class="add-user-form__input" id="firstName" type="text" v-model="user.firstName" placeholder="eg. John" @blur="$v.user.firstName.$touch()">
      </div>
      <div class="add-user-form__input-group" :class="{invalid: $v.user.lastName.$error}">
        <label class="add-user-form__label" for="lastName">Last Name</label>
        <input class="add-user-form__input" id="lastName" type="text" v-model="user.lastName" placeholder="eg. Smith" @blur="$v.user.lastName.$touch()">
      </div>
      <div class="add-user-form__input-group" :class="{invalid: $v.user.email.$error}">
        <label class="add-user-form__label" for="email">Email</label>
        <input class="add-user-form__input" id="email" type="text" v-model.lazy="user.email" placeholder="eg. username@gmail.com" @blur="$v.user.email.$touch()">
        <p v-if="!$v.user.email.emailCheck">An account with this email already exists</p>
      </div>
      <div class="add-user-form__input-group" :class="{invalid: $v.user.email.$error}">
        <label class="add-user-form__label" for="role">Role</label>
        <select name="role" v-model="user.role">
          <option value="admin">Admin</option>
          <option value="super-admin">Super Admin</option>
        </select>
      </div>
      <div class="input-group">
        <button class="add-user-form__button" @click.prevent="addUser" :disabled="$v.$invalid">Save</button>
      </div>
      <div class="input-group">
        <button class="add-user-form__button" @click.prevent="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

// export function emailCheck(value, parentVm) {
//     if (value === '') {
//         return true
//     }
//     return this.$axios.get(`${process.env.baseURL}users.json?orderBy="email"&equalTo="${value}"`)
//         .then(res => {
//             return Object.keys(res.data).length === 0
//         })
//         .catch(e => console.log(e))
// }

export default {
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          role: 'admin'
        }
      }
    },
    methods: {
      addUser() {
        this.$store.dispatch('addUser', this.user)
          .then((data) => {
            this.$emit('newUserAdded', data)
            this.clearForm()
          })
          .catch(e => {
            console.log(e)
          })
      },
      clearForm() {
        this.user = {
          firstName: '',
          lastName: '',
          email: ''
        }
        this.$nextTick(() => { this.$v.$reset() })
      },
      cancel() {
        this.clearForm()
        this.$emit('close')
      }
    },
    validations: {
      user: {
        firstName: {
          required: required
        },
        lastName: {
          required: required
        },
        email: {
          required: required,
          email
          // emailCheck: emailCheck
        }
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
