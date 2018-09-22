<template>
  <div>
    <form class="event-form">
      <label class="event-form__label" for="event-title">Title</label>
      <input class="event-form__input" v-model="singleEvent.title" id="event-title" type="text" placeholder="Event title">
      <label class="event-form__label" for="event-description">Description</label>
      <textarea class="event-form__input" v-model="singleEvent.description" id="event-description" placeholder="Event description" rows=10></textarea>
      <label class="event-form__label" for="event-date">Date</label>
      <input class="event-form__input" v-model="formDate" id="event-date" type="date" placeholder="Event date">
      <label class="event-form__label" for="event-time">Time</label>
      <input class="event-form__input" v-model="formTime" id="event-time" type="time" placeholder="Event time">
      <hr>
      <p>{{ singleEvent.dateTime }}</p>
      <hr>
      <p>{{ this.unixTime }}</p>
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
        formDate: null,
        formTime: null,
        singleEvent: {
          title: '',
          description: ''
        },
      }
    },
    components: {
      Toast
    },
    props: ['toast'],
    methods: {
      submitEvent() {
        this.$emit('submitEvent', {...this.singleEvent, dateTime: this.unixTime})
      }
    },
    computed: {
      unixTime() {
        return Date.parse(`${this.formDate} ${this.formTime}`)
      }
    }
  }
</script>
