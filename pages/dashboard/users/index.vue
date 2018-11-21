<template>
  <div>
<<<<<<< HEAD
    <UserDetailsCard :user='currentUser'></UserDetailsCard>
    <h1>Users</h1>
    <button @click="addFlag = !addFlag">Add new user</button>
    <AddUserCard v-if="addFlag" @close="addFlag = false"></AddUserCard> 
    <UsersList :users='users' @removeUser="removeUser"></UsersList>
=======
    <h1>Users</h1>
    <UsersList :users='users'></UsersList>
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253
  </div>
</template>

<script>
  import UsersList from '~/components/Users/UsersList'
<<<<<<< HEAD
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
=======
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
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253
  }
</script>
