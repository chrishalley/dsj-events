<template>
  <div>
    <section class="row">
      <div class="col-1-of-2">
        <h1>Events</h1>
        <event-form @submitEvent="saveEvent" :toast="toast"></event-form>
      </div>
      <div class="col-1-of-2">
        <h2>Events List</h2>
        <event-list :events="this.events"></event-list>
      </div>
    </section>
  </div>
</template>

<script>
import EventForm from '~/components/Events/EventForm.vue'
import EventList from '~/components/Events/EventList.vue'

  export default {
    data() {
      return {
        toast: {
          status: 'warning',
          message: null
        },
        events: []
      }
    },
    asyncData(context) {
      return context.store.dispatch('getEventData')
      .then(res => {
        return {
          events: Object.keys(res.data).map((current) => {
            return res.data[current]
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
    },
    layout: 'admin',
    components: {
      EventForm,
      EventList
    },
    methods: {
      saveEvent(singleEvent) {
        this.events.push(singleEvent)
        this.$store.dispatch('saveEvent', singleEvent)
        .then(() => {
          console.log('Successful event push')
          this.toast.status = 'good'
          this.toast.message = 'Event successfully saved!'
        })
        .catch((e) => {
          console.log('event push error')
          console.log(e)
          this.toast.status = 'error'
          this.toast.message = 'Something went wrong!'
        })
      }
    },
    computed: {
      dsjEvents() {
        return this.$store.getters.getDsjEvents
      }
    }
  }
</script>
