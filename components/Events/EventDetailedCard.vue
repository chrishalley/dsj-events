<template>
  <div class="event-form">
    <label class="event-form__label" for="editEvent-title">Title</label>
    <input type="text" class="event-form__input" :value="editEvent.title" id="editEvent-title">
    <label class="event-form__label" for="editEvent-description">Description</label>
    <textarea class="event-form__input" v-model="editEvent.description" id="editEvent-description" placeholder="Event description" rows=10></textarea>
    <label class="event-form__label" for="editEvent-start-date">Date</label>
    <input class="event-form__input" v-model="formStartDate" id="editEvent-start-date" type="date" placeholder="Event start date">
    <label class="event-form__label" for="editEvent-start-time">Start time</label>
    <input class="event-form__input" v-model="formStartTime" id="editEvent-start-time" type="time" placeholder="Event start time">
    <label class="event-form__label" for="editEvent-end-time">End time</label>
    <input class="event-form__input" v-model="formEndTime" id="editEvent-end-time" type="time" placeholder="Event end time">
    <button @click.prevent="updateEvent(updateEvent)">Update Event</button>
  </div>
</template>

<script>
export default {
  props: ['editEvent'],
  computed: {
    unixTime() {
      return {
        startDateTime: Date.parse(`${this.formStartDate} ${this.formStartTime}`),
        endDateTime: Date.parse(`${this.formStartDate} ${this.formEndTime}`)
      }
    },
    formStartDate() {
      let date, year, month, day
      console.log(this.editEvent)
      date = new Date(this.editEvent.startDateTime)
      year = date.getFullYear()
      month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
      day = date.getDate() + 1 > 9 ? date.getDate() + 1 : `0${date.getDate() + 1}`
      console.log(`${year}-${month}-${day}`)
      return `${year}-${month}-${day}`
    },
    formStartTime() {
      let startTime, hours, minutes
      startTime = new Date(this.editEvent.startDateTime)
      hours = startTime.getHours() > 9 ? startTime.getHours() : `0${startTime.getHours()}`
      minutes = startTime.getMinutes() > 9 ? startTime.getMinutes() : `0${startTime.getMinutes()}`
      return `${hours.toString()}:${minutes.toString()}`
    },
    formEndTime() {
      let endTime, hours, minutes
      endTime = new Date(this.editEvent.endDateTime)
      hours = endTime.getHours() > 9 ? endTime.getHours() : `0${endTime.getHours()}`
      minutes = endTime.getMinutes() > 9 ? endTime.getMinutes() : `0${endTime.getMinutes()}`
      return `${hours.toString()}:${minutes.toString()}`
    }
  },
  methods: {
    updateEvent() {
      // Update event in Firebase

      // Update event in Vuex

      // Update event in component

      // Change editEvent to null
      console.log(this.editEvent)
      this.$store.dispatch('clearEditEvent')
      console.log(this.editEvent)
    }
  }
}
</script>
