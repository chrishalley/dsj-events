<template>
  <td class="timeslot-picker__table-cell">
    <p>{{event}}</p>
  </td>
</template>

<script>
export default {
  data() {
    return {
      event: null
    }
  },
  props: {
    eventProp: {
      type: String
    }
  },
  created() {
    console.log(this.eventProp)
    this.event = this.eventProp
  },
  watch: {
    eventProp: function(newEvent, oldEvent) {
      this.event = newEvent
    }
  }
}
</script>
