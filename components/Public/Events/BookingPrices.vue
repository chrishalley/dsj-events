<template>
  <div class="booking-prices">
    <h3>Booking Prices</h3>
    <p>A load of other shit</p>
    <button @click.prevent="openBookingForm">Make a booking</button>
  </div>
</template>

<script>
import BookingForm from '~/components/Events/EventForm.vue'
export default {
  data() {
    return {

    }
  },
  methods: {
    openBookingForm() {
      console.log(BookingForm)
      this.$emit('changeComponent', BookingForm)
    }
  }
}
</script>
