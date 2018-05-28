<template>
  <div>
    <h1>Events</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    middleware: ['checkAuth', 'auth']
  }
</script>
