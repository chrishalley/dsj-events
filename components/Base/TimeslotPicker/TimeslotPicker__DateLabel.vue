<template>
  <th>
    <p>{{weekday | initial}}</p>
    <p>{{dateLabel}}</p>
  </th>
</template>

<script>
const _days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default {
  data() {
    return {
      date: null
    }
  },
  computed: {
    weekday() {
      return _days[new Date(this.date.date).getDay()]
    },
    monthDay() {
      return new Date(this.date.date).getDate()
    },
    month() {
      return new Date(this.date.date).getMonth()
    },
    dateLabel() {
      return `${this.monthDay}/${this.month + 1}`
    }
  },
  props: {
    dateProp: {
      type: Object,
      required: true
    }
  },
  created() {
    this.date = this.dateProp
  },
  watch: {
    dateProp(newDate, oldDate) {
      this.date = newDate
    }
  }
}
</script>

