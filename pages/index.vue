<template>
  <div class="public-events-page">
    <!-- <Carousel></Carousel> -->
    <button @click.prevent="openOverlayTest">Overlay Test</button>
    <section class="flex-section-row">
      <UpcomingEvents :events="events"/>
      <BookingPitch @requestBooking="openBookingForm"/>
    </section>
    <OverlayDialog :component="dialog.component" v-if="dialog.open" @dialogClose="dialog.open=false"/>
    <OverlayDialogTest :childComponent="overlay.component" v-if="overlay.open" @dialogClose="overlay.open=false"/>
  </div>
</template>

<script>
import Carousel from '~/components/Carousel.vue'
import UpcomingEvents from '~/components/Public/Events/UpcomingEvents.vue'
import BookingPitch from '~/components/Public/Events/BookingPitch.vue'
import OverlayDialog from '~/components/Base/OverlayDialog.vue'
import OverlayDialogTest from '~/components/Base/OverlayDialogTest.vue'
import OverlayChildOne from '~/components/Base/OverlayChildOne.vue'
import BookingForm from '~/components/Events/EventForm.vue'

  export default {
    data() {
      return {
        title: 'Events',
        dialog: {
          open: false,
          component: null
        },
        overlay: {
          open: false,
          component: null
        }
      }
    },
    components: {
      Carousel,
      UpcomingEvents,
      BookingPitch,
      OverlayDialog,
      OverlayDialogTest,
      OverlayChildOne,
      BookingForm
    },
    methods: {
      openBookingForm() {
        this.dialog.component = BookingForm
        this.dialog.open = true
      },
      openOverlayTest() {
        console.log('click')
        this.overlay.component = OverlayChildOne
        this.overlay.open = true
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