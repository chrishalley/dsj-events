<template>
  <div>
    <h1>Users</h1>
    <UsersList :users='users'></UsersList>
  </div>
</template>

<script>
  import UsersList from '~/components/Users/UsersList'
  export default {
    components: {
      UsersList
    },
    data() {
      return {
        users: [
          {
            applicationDate: 'Tuesday',
            approvedDate: 'Wednesday',
            email: 'email@email.com',
            firstName: 'John',
            lastName: 'Smith',
            userId: '1',
            userStatus: 'Approved'
          }
        ]
      }
    },
    asyncData() {
      console.log('Async data!')
    },
    beforeCreate() {
      this.$axios.$get(process.env.baseURL + 'users.json')
        .then(res => {
          this.users = Object.keys(res).map((key) => {
            return res[key]
          })
        })
        .catch(e => {
          console.log(e)
        })
    },
    // layout: 'admin'
  }
</script>
