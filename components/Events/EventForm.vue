<template>
  <div>
    <form class="event-form">
      <label class="event-form__label" for="event-title">Title</label>
      <input class="event-form__input" v-model="event.title" id="event-title" type="text" placeholder="Event title">
      <label class="event-form__label" for="event-description">Description</label>
      <textarea class="event-form__input" v-model="event.description" id="event-description" placeholder="Event description" rows=10></textarea>
      <label>Featured image</label>
      <image-upload></image-upload>
      <label class="event-form__label" for="event-start-date">Date</label>
      <input class="event-form__input" v-model="formStartDate" id="event-start-date" type="date" placeholder="Event start date">
      <label class="event-form__label" for="event-start-time">Start time</label>
      <input class="event-form__input" v-model="formStartTime" id="event-start-time" type="time" placeholder="Event start time">
      <label class="event-form__label" for="event-end-time">End time</label>
      <input class="event-form__input" v-model="formEndTime" id="event-end-time" type="time" placeholder="Event end time">
      <button @click.prevent="saveEvent()">Create Event</button>
    </form>
    <toast :toast="toast"></toast>
  </div>
</template>

<script>
import Toast from '~/components/Base/Toast.vue'
import ImageUpload from '~/components/Base/ImageUpload.vue'

  export default {
    name: 'eventForm',
    data() {
      return {
        formStartDate: null,
        formStartTime: null,
        formEndTime: null,
        event: {
          title: '',
          description: ''
        },
      }
    },
    components: {
      Toast,
      ImageUpload
    },
    props: ['toast'],
    methods: {
      saveEvent() {
        const event = {
          ...this.event,
          ...this.unixTime
        }
        console.log('Event: ', event)
        this.$store.dispatch('createEvent', event)
          .then(res => {
            console.log(res)
          })
          .catch(e => {
            console.log(e)
          })
        // singleEvent = {...singleEvent, ...unixTime}
        // this.$store.dispatch('saveEvent', singleEvent)
        // .then(() => {
        //   this.$emit('addEvent', singleEvent)
        //   this.toast.status = 'good'
        //   this.toast.message = 'Event successfully saved!'
        // })
        // .catch((e) => {
        //   console.log('event push error')
        //   console.log(e)
        //   this.toast.status = 'error'
        //   this.toast.message = 'Something went wrong!'
        // })
      }
    },
    computed: {
      unixTime() {
        return {
          startDateTime: Date.parse(`${this.formStartDate} ${this.formStartTime}`),
          endDateTime: Date.parse(`${this.formStartDate} ${this.formEndTime}`)
        }
      }
    }
  }
</script>
