<template>
  <div>
    <section class="row">
      <div class="col-1-of-2">
        <h1>Events</h1>
        <event-form @submitEvent="saveEvent"></event-form>
      </div>
      <div class="col-1-of-2">
        <event-list :dsjEvents="this.dsjEvents"></event-list>
      </div>
    </section>
  </div>
</template>

<script>
import EventForm from '~/components/Events/EventForm.vue'
import EventList from '~/components/Events/EventList.vue'
  export default {
    // layout: 'admin',
    components: {
      EventForm,
      EventList
    },
    methods: {
      saveEvent(singleEvent) {
        console.log('saveEvent()')
        console.log('Single Event: ', singleEvent)
        this.$store.dispatch('saveEvent', singleEvent)
      }
    },
    computed: {
      dsjEvents() {
        return this.$store.getters.getDsjEvents
      }
    }
  }
</script>
