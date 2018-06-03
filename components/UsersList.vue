<template>
  <div>
    <div class="users-list">
      <div v-for="(user, i) in users" :key="i" class="users-list__tile">
        <div class="users-list__status-chip" :class="statusClass(user)"></div>
        <p class="users-list__tile-info users-list__tile-info--name">{{user.firstName}} {{user.lastName}}</p>
        <p class="users-list__tile-info"><a href="mailto:${user.email}">{{user.email}}</a></p>
        <p class="users-list__tile-info">{{user.applicationDate | DDMMYY}}</p>
        <p class="users-list__tile-info">{{user.userStatus}}</p>
        <p style="color: green" class="users-list__tile-info" @click="userApprove(user)" v-if="user.userStatus !== 'Approved'">Approve</p>
        <p style="color: orange" class="users-list__tile-info" @click="userSuspend(user)" v-if="user.userStatus === 'Approved'">Suspend</p>
        <p style="color: red" class="users-list__tile-info" @click="userRemove(user)">Delete</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['users'],
    data() {
      return {

      }
    },
    filters: {
      DDMMYY(value) {
        let date = new Date(value)
        let day = date.getDay().length > 1 ? date.getDay() : '0' + date.getDay()
        let month = date.getMonth().length > 1 ? date.getMonth() : '0' + date.getMonth()
        let year = date.getFullYear()
        return day + '/' + month + '/' + year
      }
    },
    methods: {
      userApprove(user) {
        this.$store.dispatch('approveUser', user)
        .then(res => {
          // console.log(user)
          user.userStatus = 'Approved'
        })
        .catch(e => {
          console.log(e)
        })
      },
      userRemove(user) {
        console.log('userRemove()')
        this.$store.dispatch('deleteUser', user)
        user.userStatus = 'Deleted'
      },
      userSuspend(user) {
        user.userStatus = 'Suspended'
      },
      statusClass(user) {
        let statusClass = {}
        let userStatus = user.userStatus
        console.log(userStatus)
        switch(userStatus) {
          case 'Approved':
            statusClass = {'users-list__status-chip--approved': true}
            break;
          case 'Pending':
            statusClass = {'users-list__status-chip--pending': true}
            break;
          case 'Suspended':
            statusClass = {'users-list__status-chip--suspended': true}
            break;
          default:
            statusClass = {}
        }
        return statusClass
      }
    },
    computed: {

    }
  }
</script>
