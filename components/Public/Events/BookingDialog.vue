<template>
  <div class="booking-dialog">
    <BookingForm :toast="toast" />
  </div>
</template>

<script>
import BookingForm from '~/components/Events/EventForm.vue'

export default {
  data() {
    return {
      toast: {
        status: 'warning',
        message: null
      }
    }
  },
  components: {
    BookingForm
  }
}
</script>


