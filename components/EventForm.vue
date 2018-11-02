<template>
  <form>
    <label for="event-title">Event title</label>
    <input v-model="event.title" id="event-title" type="text" placeholder="Event title">
    <label for="event-description">Event description</label>
    <input v-model="event.description" id="event-description" type="text" placeholder="Event description">
    <label for="event-date">Event date</label>
    <input v-model="event.date" id="event-date" type="date" placeholder="Event date">
    <button @click.prevent="createEvent">Create Event</button>
  </form>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'eventForm',
    data() {
      return {
        events: [],
        event: {
          title: '',
          description: '',
          date: null
        }
      }
    },
    methods: {
      createEvent() {
        this.$axios.post('https://dsj-events-app.firebaseio.com/events.json', this.event)
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>
