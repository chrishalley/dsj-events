<template>
  <div>
    <div class="users-list">
      <div class="users-list__header">
        <ul class="users-list__header-list">
          <li class="users-list__header-list-item users-list__header-list-item--name">Name<span @click="orderByName(users)">  A</span></li>
          <li class="users-list__header-list-item users-list__header-list-item--email">Email</li>
          <li class="users-list__header-list-item users-list__header-list-item--date">Join Date</li>
          <li class="users-list__header-list-item users-list__header-list-item--status">Role</li>
          <li class="users-list__header-list-item users-list__header-list-item--actions">Actions</li>
        </ul>
      </div>
      <div v-for="(user, i) in users" :key="i" class="users-list__tile">
        <user-list-item :user="user" @userDeleted="removeUser" @editUser="editUser"></user-list-item>
      </div>
    </div>
    <user-details-card :user="editableUser" v-if="editableUser"></user-details-card>
  </div>
</template>

<script>
import UserListItem from '~/components/Users/UserListItem.vue'
import UserDetailsCard from '~/components/Users/UserDetailsCard.vue'
  export default {
    props: ['users'],
    data() {
      return {
        editableUser: null
      }
    },
    components: {
      UserListItem,
      UserDetailsCard
    },
    methods: {
      orderByName(users) {
        // let array = ['Trevor', 'Paul', 'Dan', 'Harry']
        // array.sort((a, b) => {
        //   console.log(a, b)
        //   return a > b
        // })
        // console.log(array)
        this.users.sort((a,b) => {
          const nameA = a.firstName.toLowerCase()
          const nameB = b.firstName.toLowerCase()
          return (nameA > nameB) ? -1 : (nameA < nameB) ? -1 : 0
        })
        console.log(this.users)
      },
      removeUser(id) {
        this.$emit('removeUser', id)
      },
      editUser(id) {
        console.log('editUser bubble')
        this.$store.dispatch('getUserById', id)
          .then(user => {
            console.log(user)
            this.editableUser = user
          })
          .catch(e => {
            console.log(this.$axios.defaults.headers)
            console.log(e)
          })
      }
    }
  }
</script>
