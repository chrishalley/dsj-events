<template>
  <div>
    <h1>Dashboard</h1>
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
