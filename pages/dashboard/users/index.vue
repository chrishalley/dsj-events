<template>
  <div>
    <h1>Users</h1>
    <UsersList :users='users'></UsersList>
  </div>
</template>

<script>
  import UsersList from '~/components/UsersList'
  export default {
    components: {
      UsersList
    },
    data() {
      return {
        users: []
      }
    },
    methods: {

    },
    beforeCreate() {
      this.$axios.$get('https://dsj-events-app.firebaseio.com/users.json')
      .then(res => {
        console.log(res)
        this.users = res
      })
      .catch(e => {
        console.log(e)
      })
    },
    middleware: ['checkAuth', 'auth']
  }
</script>
