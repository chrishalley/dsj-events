<template>
    <ul class="users-list__tile-list">
        <li class="users-list__tile-info">
        <div class="users-list__status-chip" :class="statusClass(user)"></div>
        </li>
        <li class="users-list__tile-info users-list__tile-info--name">{{user.firstName}} {{user.lastName}}</li>
        <li class="users-list__tile-info"><a :href="mailto">{{user.email}}</a></li>
        <li class="users-list__tile-info">{{user.dateApplied | DDMMYY}}</li>
        <li class="users-list__tile-info">{{user.userStatus}}</li>
        <li style="color: green" class="users-list__tile-info" @click="userApprove(user)" v-if="user.status !== 'approved'">Approve</li>
        <li style="color: orange" class="users-list__tile-info" @click="userSuspend(user)" v-if="user.status === 'approved'">Suspend</li>
        <li style="color: red" class="users-list__tile-info" @click="userRemove(user)" v-if="user.status !== 'deleted'">Delete</li>
    </ul>
</template>

<script>
export default {
    props: ['user'],
    methods: {
        statusClass(user) {
        let statusClass = {}
        switch(user.status) {
          case 'approved':
            statusClass = {'users-list__status-chip--approved': true}
            break;
          case 'pending':
            statusClass = {'users-list__status-chip--pending': true}
            break;
          case 'suspended':
            statusClass = {'users-list__status-chip--suspended': true}
            break;
          case 'deleted':
            statusClass = {'users-list__status-chip--deleted': true}
            break;
          default:
            statusClass = {}
        }
        return statusClass
      },
      userApprove(user) { // Dispatch action to approve user application
        const payload = {
          id: user._id,
          update: {
            status: 'approved'
          }
        }
        this.$store.dispatch('updateUser', payload)
          .then(res => {
            user.status = 'approved'
          })
          .catch(e => console.log(e))
      },
      userRemove(user) { // Delete user from user node
      const id = user._id
        this.$store.dispatch('deleteUser', id)
          .then(() => {
            this.$emit('userDeleted', id)
          })
          .catch(e => console.log(e))
      },
      userSuspend(user) { // Add 'Suspended' flag to user's data, preventing access in future but not deleting their account
        const payload = {
          id: user._id,
          update: {
            status: 'suspended'
          }
        }
        this.$store.dispatch('updateUser', payload)
          .then(res => {
            user.status = 'suspended'
          })
          .catch(e => console.log(e))
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
    computed: {
      mailto() {
        return `mailto:${this.user.email}`
      }
    }
}
</script>
