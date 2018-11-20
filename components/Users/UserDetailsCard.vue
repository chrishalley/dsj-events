<template>
  <div class="card user-details-card mt-sm">
    <div class="view" v-if="!editFlag">
      <h3>{{user.firstName}} {{user.lastName}}</h3>
      <p>Role: {{user.role}}</p>
      <hr>
      <p>Email: {{user.email}}</p>
    </div>
    <div class="edit" v-if="editFlag">
      <h3>{{user.firstName}} {{user.lastName}}</h3>
      <form class="edit-user-form">
        <div class="edit-user-form__input-group" :class="{invalid: $v.user.firstName.$error}">
          <label class="edit-user-form__label" for="firstName">First Name</label>
          <input class="edit-user-form__input" id="firstName" type="text" v-model="editUser.firstName" :placeholder="user.firstName" @blur="$v.user.firstName.$touch()">
        </div>
        <div class="edit-user-form__input-group" :class="{invalid: $v.user.lastName.$error}">
          <label class="edit-user-form__label" for="lastName">Last Name</label>
          <input class="edit-user-form__input" id="lastName" type="text" v-model="editUser.lastName" :placeholder="user.lastName" @blur="$v.user.lastName.$touch()">
        </div>
        <div class="edit-user-form__input-group" :class="{invalid: $v.user.email.$error}">
          <label class="edit-user-form__label" for="role">Role</label>
          <select name="role" v-model="editUser.role" :disabled="!userIsSuperAdmin">
            <option v-for="(role, i) in roles" :value="role.role" :selected="role.role === user.role ? 'selected': ''" :key="i">{{role.name}}</option>
          </select>
        </div>
        <div class="edit-user-form__input-group" :class="{invalid: $v.user.email.$error}">
          <label class="edit-user-form__label" for="email">Email</label>
          <input class="edit-user-form__input" id="email" type="text" v-model.lazy="editUser.email" :placeholder="user.email" @blur="$v.user.email.$touch()">
          <p v-if="!$v.user.email.emailCheck">An account with this email already exists</p>
        </div>
      </form>
    </div>
    <hr>
    <button class="ui-button edit-user-form__button" @click.prevent="initEdit" v-if="!editFlag">Edit</button>
    <button class="ui-button edit-user-form__button" @click.prevent="saveUser" :disabled="$v.$invalid" v-if="editFlag">Save</button>
    <button class="ui-button edit-user-form__button" @click.prevent="cancelEdit" v-if="editFlag">Cancel</button>
    <!-- <div>{{currentUser}}</div>
    <div>{{userIsSuperAdmin}}</div> -->
    <!-- <div>
      <h4>editUser:</h4>
      <div>{{editUser}}</div>  
    </div>
    <div>
      <h4>user:</h4>
      <div>{{user}}</div>  
    </div> -->
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      editFlag: false,
      editUser: {},
      roles: [
        {role: 'admin', name: 'admin'},
        {role: 'super-admin', name: 'super-admin'}
      ]
    }
  },
  props: ['user'],
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    },
    userIsSuperAdmin() {
      return this.$store.getters.currentUser.role === 'super-admin'
    }
  },
  methods: {
    initEdit() {
      this.editUser = {...this.user}
      this.editFlag = true
    },
    saveUser() {
      this.$store.dispatch('updateUser', this.editUser)
        .then(res => {
          console.log('res: ', res)
          this.$store.commit('setCurrentUser', res.data)
        })
        .catch(e => {
          console.log(e)
        });
    },
    cancelEdit() {
      this.editUser = null
      this.editFlag = false
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

