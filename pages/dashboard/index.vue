<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Home'
      }
    },
    layout: 'admin',
    head() {
      return {
        title: this.title
      }
    }
  }
</script>
