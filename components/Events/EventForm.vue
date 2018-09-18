<template>
  <div>
    <form class="event-form">
      <label class="event-form__label" for="event-title">Event title</label>
      <input class="event-form__input" v-model="singleEvent.title" id="event-title" type="text" placeholder="Event title">
      <label class="event-form__label" for="event-description">Event description</label>
      <input class="event-form__input" v-model="singleEvent.description" id="event-description" type="text" placeholder="Event description">
      <label class="event-form__label" for="event-date">Event date</label>
      <input class="event-form__input" v-model="singleEvent.date" id="event-date" type="date" placeholder="Event date">
      <button @click.prevent="submitEvent">Create Event</button>
    </form>
    <toast :toast="toast"></toast>
  </div>
</template>

<script>
import Toast from '~/components/Base/Toast.vue'

  export default {
    name: 'eventForm',
    data() {
      return {
        singleEvent: {
          title: '',
          description: '',
          date: null
        },
      }
    },
    components: {
      Toast
    },
    props: ['toast'],
    methods: {
      submitEvent() {
        this.$emit('submitEvent', this.singleEvent)
      }
    }
  }
</script>
