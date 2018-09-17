<template>
  <form class="event-form">
    <label class="event-form__label" for="event-title">Event title</label>
    <input class="event-form__input" v-model="singleEvent.title" id="event-title" type="text" placeholder="Event title">
    <p>{{ singleEvent.title }}</p>
    <label class="event-form__label" for="event-description">Event description</label>
    <input class="event-form__input" v-model="singleEvent.description" id="event-description" type="text" placeholder="Event description">
    <p>{{ singleEvent.description }}</p>
    <label class="event-form__label" for="event-date">Event date</label>
    <input class="event-form__input" v-model="singleEvent.date" id="event-date" type="date" placeholder="Event date">
    <p>{{ singleEvent.date }}</p>
    <button @click.prevent="submitEvent">Create Event</button>
  </form>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'eventForm',
    data() {
      return {
        singleEvent: {
          title: '',
          description: '',
          date: null
        }
      }
    },
    methods: {
      submitEvent() {
        console.log('Event: ', this.singleEvent)
        this.$emit('submitEvent', this.singleEvent)
        console.log('submitEvent emitted')
      }
    }
  }
</script>
