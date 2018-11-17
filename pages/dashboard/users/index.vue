<template>
  <div>
    <h1>Users</h1>
    <UsersList :users='users' @removeUser="removeUser"></UsersList>
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
          // {
          //   applicationDate: 'Tuesday',
          //   approvedDate: 'Wednesday',
          //   email: 'email@email.com',
          //   firstName: 'John',
          //   lastName: 'Smith',
          //   userId: '1',
          //   userStatus: 'Approved'
          // }
        ]
      }
    },
    asyncData(context) {
      console.log('Async data!')
      return context.$axios.get(`${process.env.baseURL}/users`)
        .then(res => {
          return {users: res.data}
        })
        .catch(e => {
          console.log(e)
        });
    },
    methods: {
      removeUser(id) {
        this.users = this.users.filter(cur => {
          return cur._id !== id
        })
      }
    },
    beforeCreate() {
      // this.$axios.$get(process.env.baseURL + 'users.json')
      //   .then(res => {
      //     this.users = Object.keys(res).map((key) => {
      //       return res[key]
      //     })
      //   })
      //   .catch(e => {
      //     console.log(e)
      //   })
    },
    layout: 'admin'
  }
</script>
