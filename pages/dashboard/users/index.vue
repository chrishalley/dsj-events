<template>
  <div>
    <h1>Users</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    middleware: ['auth', 'checkAuth']
  }
</script>
