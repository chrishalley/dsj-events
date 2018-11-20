<template>
  <div>
    <h1>Users</h1>
    <button @click="addFlag = !addFlag">Add new user</button>
    <AddUserCard v-if="addFlag" @close="addFlag = false"></AddUserCard> 
    <UsersList :users='users' @removeUser="removeUser"></UsersList>
  </div>
</template>

<script>
  import UsersList from '~/components/Users/UsersList'
  import AddUserCard from '~/components/Users/AddUserCard'
  export default {
    components: {
      UsersList,
      AddUserCard
    },
    data() {
      return {
        users: [],
        addFlag: false
      }
    },
    asyncData(context) {
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
