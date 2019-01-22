<template>
  <th class="date-label">
    <p class="date-label__weekday">{{weekday.slice(0,3)}}</p>
    <p class="date-label__date">{{dateLabel}}</p>
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
      return _days[new Date(this.date).getDay()]
    },
    monthDay() {
      return new Date(this.date).getDate()
    },
    month() {
      return new Date(this.date).getMonth()
    },
    dateLabel() {
      return `${this.monthDay}/${this.month + 1}`
    }
  },
  props: {
    dateProp: {
      type: Date,
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

