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
        <ul class="users-list__tile-list">
          <li class="users-list__tile-info">
            <div class="users-list__status-chip" :class="statusClass(user)"></div>
          </li>
          <li class="users-list__tile-info users-list__tile-info--name">{{user.firstName}} {{user.lastName}}</li>
          <li class="users-list__tile-info"><a href="mailto:${user.email}">{{user.email}}</a></li>
          <li class="users-list__tile-info">{{user.applicationDate | DDMMYY}}</li>
          <li class="users-list__tile-info">{{user.userStatus}}</li>
          <li style="color: green" class="users-list__tile-info" @click="userApprove(user)" v-if="user.userStatus !== 'Approved'">Approve</li>
          <li style="color: orange" class="users-list__tile-info" @click="userSuspend(user)" v-if="user.userStatus === 'Approved'">Suspend</li>
          <li style="color: red" class="users-list__tile-info" @click="userRemove(user)" v-if="user.userStatus !== 'Deleted'">Delete</li>
        </ul>
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
  export default {
    props: ['users'],
    data() {
      return {

      }
    },
    filters: {
      DDMMYY(value) {
        let date = new Date(value)
        let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
        let year = date.getFullYear()
        return day + '/' + month + '/' + year
      }
    },
    methods: {
      userApprove(user) { // Dispatch action to approve user application
        this.$store.dispatch('getUserByEmail', user)
        .then((value) => {
          if (!value) { // In the case that an account for that email does not already exist
            this.$store.dispatch('approveUser', user)
            .then(res => {
              user.userStatus = 'Approved'
            })
            .catch(e => {
              console.log(e)
            })
          } else { // An account already exists
            console.log('An account already exists')
            this.$store.dispatch('reinstateUser', user) // Reinstate user in the database
            .then(res => {
              user.userStatus = 'Approved' // Change user's local status
            })
            .catch(e => {
              console.log(e)
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
      },
      userRemove(user) { // Delete user from user node
        console.log('userRemove()')
        this.$store.dispatch('deleteUser', user)
        user.userStatus = 'Deleted'
      },
      userSuspend(user) { // Add 'Suspended' flag to user's data, preventing access in future but not deleting their account
        user.userStatus = 'Suspended'
        this.$store.dispatch('suspendUser', user)
      },
      statusClass(user) {
        let statusClass = {}
        let userStatus = user.userStatus
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
          case 'Deleted':
            statusClass = {'users-list__status-chip--deleted': true}
            break;
          default:
            statusClass = {}
        }
        return statusClass
      },
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
      }
      //   console.log(users)
      //   console.log('click')
      //   console.log(typeof users)
      //   console.log('orderByName()')
      //   for (let i = 0; i < (users.length - 1); i++) {
      //     console.log(users[i].firstName)
      //     if (users[i+1].firstName < users[i].firstName) {
      //       console.log('switch')
      //       let userHolder = users[i]
      //       users[i] = users[i+1]
      //       users[i+1] = userHolder
      //       userHolder = null
      //     }
      //   }
      // }
    },
    computed: {

    }
  }
</script>
