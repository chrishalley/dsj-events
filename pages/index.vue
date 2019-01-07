<template>
  <div class="public-events-page">
    <Carousel></Carousel>
    <section class="flex-section-row">
      <UpcomingEvents :events="events"/>
      <BookingPitch @requestBooking="openBookingForm"/>
    </section>
    <OverlayDialog :component="dialog.component" v-if="dialog.open" @dialogClose="dialog.open=false"/>
  </div>
</template>

<script>
import Carousel from '~/components/Carousel.vue'
import UpcomingEvents from '~/components/Public/Events/UpcomingEvents.vue'
import BookingPitch from '~/components/Public/Events/BookingPitch.vue'
import OverlayDialog from '~/components/Base/OverlayDialog.vue'
import BookingForm from '~/components/Events/EventForm.vue'
import BookingPrices from '~/components/Public/Events/BookingPrices.vue'

  export default {
    data() {
      return {
        title: 'Events',
        dialog: {
          open: false,
          component: BookingForm
        }
      }
    },
    components: {
      Carousel,
      UpcomingEvents,
      BookingPitch,
      OverlayDialog,
      BookingForm
    },
    methods: {
      openBookingPrices() {
        this.dialog.component = BookingPrices
        this.dialog.open = true;
      },  
      openBookingForm() {
        this.dialog.component = BookingForm
        this.dialog.open = true;
      }
    },
    asyncData(context) {
      return context.store.dispatch('getEvents')
        .then(events => {
          return {
            events: events
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    head() {
      return {
        title: this.title
      }
    }
  }
</script>