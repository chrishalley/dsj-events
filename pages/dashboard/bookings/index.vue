<template>
  <h2>Bookings</h2>
</template>

<script>
export default {
  data() {
    return {
      title: 'Bookings'
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
