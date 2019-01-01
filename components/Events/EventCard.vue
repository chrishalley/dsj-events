<template>
  <div>
    <p class="event-list__item-title">{{ event.title }}</p>
    <!-- <p class="event-list__item-date mb-sm">{{ dsjEvent.startDateTime | unixToDate() }}, {{ dsjEvent.startDateTime | unixToTime() }} - {{ dsjEvent.endDateTime | unixToTime() }}</p> -->
    <hr>
    <p class="event-list__item-description">{{ event.description }}</p>
    <button @click="editEvent">Edit</button>
  </div>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    editEvent() {
      this.$store.dispatch('setEditEvent', this.event)
    }
  }
}
</script>