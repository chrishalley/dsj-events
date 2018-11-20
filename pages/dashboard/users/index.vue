<template>
  <div>
    <UserDetailsCard :user='currentUser'></UserDetailsCard>
    <h1>Users</h1>
    <button @click="addFlag = !addFlag">Add new user</button>
    <AddUserCard v-if="addFlag" @close="addFlag = false"></AddUserCard> 
    <UsersList :users='users' @removeUser="removeUser"></UsersList>
  </div>
</template>

<script>
  import UsersList from '~/components/Users/UsersList'
  import AddUserCard from '~/components/Users/AddUserCard'
  import UserDetailsCard from '~/components/Users/UserDetailsCard'

  export default {
    components: {
      UsersList,
      AddUserCard,
      UserDetailsCard
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
    computed: {
      currentUser() {
        return this.$store.getters.currentUser
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
