<template>
  <div>
    <section class="row">
      <div class="col-1-of-2">
        <h1>Events</h1>
        <event-form :toast="toast" @addEvent="addEvent"></event-form>
      </div>
      <div class="col-1-of-2">
        <h2>Events List</h2>
        <event-list :events="events"></event-list>
      </div>
    </section>
    <section class="row">
      <div class="col-1-of-2">
        <!-- <event-detailed-card v-if="editEvent" :editEvent="editEvent"></event-detailed-card> -->
      </div>
    </section>
  </div>
</template>

<script>
import EventForm from '~/components/Events/EventForm.vue'
import EventList from '~/components/Events/EventList.vue'
// import EventDetailedCard from '~/components/Events/EventDetailedCard.vue'

  export default {
    data() {
      return {
        title: 'Events',
        toast: {
          status: 'warning',
          message: null
        },
        events: null
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
    layout: 'admin',
    head() {
      return {
        title: this.title
      }
    },
    components: {
      EventForm,
      EventList,
      // EventDetailedCard
    },
    computed: {
      dsjEvents() {
        return this.$store.getters.getDsjEvents
      },
      editEvent() {
        return this.$store.getters.getEditEvent
      }
    },
    methods: {
      addEvent(singleEvent) { // Adds newly created event to array of events
        this.events.push(singleEvent)
      },
      setEditEvent(dsjEvent) {
        console.log('setEditEvent()')
        // this.editEvent = {...dsjEvent}
        // console.log('Event: ', this.editEvent)
      }
    }
  }
</script>
