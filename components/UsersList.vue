<template>
  <div>
    <h1>Users List</h1>
    <ul>
      <li v-for="(user, i) in users" :key="i">{{user}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['users'],
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>
