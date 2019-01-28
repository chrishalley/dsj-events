<template>
  <div class="rolling-date-picker">
    <div class="rolling-date-picker__panel">
      <button @click.prevent="changeDate('inc', 1)">Inc</button>
      <div class="rolling-date-picker__panel-display">
        <div>{{date.date}}</div>
      </div>
      <button @click.prevent="changeDate('dec', 1)">Dec</button>
    </div>
    <div class="rolling-date-picker__panel">
      <button @click.prevent="changeMonth('inc', 1)">Inc</button>
      <div class="rolling-date-picker__panel-display">
        <div>{{date.month - 1 | monthArrayToString}}</div>
      </div>
      <button @click.prevent="changeMonth('dec', 1)">Dec</button>
    </div>
    <div class="rolling-date-picker__panel">
      <button @click.prevent="changeYear('inc', 1)">Inc</button>
      <div class="rolling-date-picker__panel-display">
        <div>{{date.year}}</div>
      </div>
      <button @click.prevent="changeYear('dec', 1)">Dec</button>
    </div>
    <!-- <p>currentDateMidnightTime: {{currentDateMidnightTime}}</p>
    <p>selectedDateMidnightTime: {{selectedDateMidnightTime}}</p>
    <p>in past? {{selectedDateInPast}}</p> -->
  </div>
</template>

<script>

export default {
  name: 'RollingDatePicker',
  data() {
    return {
      days: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      date: {
        date: null,
        month: null,
        year: null
      },
      allowPastDates: this.allowPastDatesProp === "true",
      currentDate: new Date()
    }
  },
  props: {
    dateStringProp: {
      type: String
    },
    allowPastDatesProp: {
      type: String,
      default: "true"
    }
  },
  computed: {
    dateString() {
      if (this.date.date < 10) {
        return `0${this.date.date}`
      }
      return this.date.date
    },
    monthString() {
      if (this.date.month < 10) {
        return `0${this.date.month}`
      }
      return this.date.month
    },
    fullDateString() {
      return `${this.date.year}-${this.monthString}-${this.dateString}`
    },
    daysInMonth() {
      if (this.date.month - 1 === 1 && this.date.year % 4 === 0) {
        return 29
      }
      return this.days[this.date.month - 1]
    },
    currentDateMidnightTime() {
      const date = this.currentDate
      const offset = date.getTimezoneOffset() / 60
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), -offset).getTime()
    },
    selectedDateMidnightTime() {
      return new Date(Date.UTC(this.date.year, this.date.month - 1, this.date.date)).getTime()
    },
    selectedDateInPast() {
      return this.selectedDateMidnightTime < this.currentDateMidnightTime
    }
  },
  methods: {
    changeDate(direction, increment) {
      if (direction === 'dec') {
        increment = increment * -1
      }
      this.date.date += increment
      if (this.date.date > this.daysInMonth) {
        this.date.date = 0
      } else if (this.date.date < 0) {
        this.date.date = this.daysInMonth
      }
      if (!this.allowPastDates && this.selectedDateInPast) {
        this.setDateToCurrent()
      }
      this.$emit('input', this.fullDateString)
    },
    changeMonth(direction, increment) {
      if (direction === 'dec') {
        increment = increment * -1
      }
      this.date.month += increment
      if (this.date.month > 12) {
        this.date.month = 1
      } else if (this.date.month < 1) {
        this.date.month = 12
      }
      if (!this.allowPastDates && this.selectedDateInPast) {
        this.setDateToCurrent()
      }
      this.$emit('input', this.fullDateString)
    },
    changeYear(direction, increment) {
      if (direction === 'dec') {
        increment = increment * -1
      }
      this.date.year += increment
      if (this.date.year > new Date().getFullYear + 5) {
        return
      }
      if (!this.allowPastDates && this.selectedDateInPast) {
        this.setDateToCurrent()
      }
      this.$emit('input', this.fullDateString)
    },
    setDateToCurrent() {
      const currentDate = new Date()
      this.date.year = currentDate.getUTCFullYear()
      this.date.month = currentDate.getUTCMonth() + 1
      this.date.date = currentDate.getUTCDate()
    }
  },
  watch: {
    dateStringProp: function(newProp, oldProp) {
      this.date.date = parseInt(newProp.slice(8,10))
      this.date.month = parseInt(newProp.slice(5,7))
      this.date.year = parseInt(newProp.slice(0,4))
    },
    selectedDateInPast: function(newValue, oldValue) {
      if (!this.allowPastDates && newValue) {
        this.setDateToCurrent()
      }
    }
  },
  created() {
    if (this.dateStringProp) {
      this.date.date = parseInt(this.dateStringProp.slice(8,10))
      this.date.month = parseInt(this.dateStringProp.slice(5,7))
      this.date.year = parseInt(this.dateStringProp.slice(0,4))
    }

    if (!this.allowPastDates && this.selectedDateInPast) {
      this.setDateToCurrent()
      this.$emit('input', this.fullDateString)
    }
  }
}
</script>

