<template>
  <div>
    <div class="users-list">
      <div class="users-list__header">
        <ul class="users-list__header-list">
          <li class="users-list__header-list-item users-list__header-list-item--status-chip">Status</li>
          <li class="users-list__header-list-item users-list__header-list-item--name">Name<span @click="orderByName(users)">A</span></li>
          <li class="users-list__header-list-item users-list__header-list-item--email">Email</li>
          <li class="users-list__header-list-item users-list__header-list-item--date">Join Date</li>
          <li class="users-list__header-list-item users-list__header-list-item--status">Status</li>
          <li class="users-list__header-list-item users-list__header-list-item--actions">Actions</li>
        </ul>
      </div>
      <div v-for="(user, i) in users" :key="i" class="users-list__tile">

        <user-list-item :user="user" @userDeleted="removeUser" ></user-list-item>
        <!-- <div class="users-list__tile-info users-list__status-chip" :class="statusClass(user)"></div>
        <p class="users-list__tile-info users-list__tile-info--name">{{user.firstName}} {{user.lastName}}</p>
        <p class="users-list__tile-info"><a href="mailto:${user.email}">{{user.email}}</a></p>
        <p class="users-list__tile-info">{{user.applicationDate | DDMMYY}}</p>
        <p class="users-list__tile-info">{{user.userStatus}}</p>
        <p style="color: green" class="users-list__tile-info" @click="userApprove(user)" v-if="user.userStatus !== 'Approved'">Approve</p>
        <p style="color: orange" class="users-list__tile-info" @click="userSuspend(user)" v-if="user.userStatus === 'Approved'">Suspend</p>
        <p style="color: red" class="users-list__tile-info" @click="userRemove(user)" v-if="user.userStatus !== 'Deleted'">Delete</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import UserListItem from '~/components/Users/UserListItem.vue'
  export default {
    props: ['users'],
    data() {
      return {

      }
    },
    components: {
      UserListItem
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
      }
    }
  }
</script>
