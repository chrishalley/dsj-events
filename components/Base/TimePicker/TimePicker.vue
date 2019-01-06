<template>
  <div class="time-picker">
    <div class="time-picker__panel">
      <button @click.prevent="changeHours('inc', 1)">Inc</button>
      <div class="time-picker__panel-display">
        <div>{{hoursString}}</div>
      </div>
      <button @click.prevent="changeHours('dec', 1)">Dec</button>
    </div>
    <div class="divider">
      <p>:</p>
    </div>
    <div class="time-picker__panel">
      <button @click.prevent="changeMinutes('inc', 15)">Inc</button>
      <div class="time-picker__panel-display">
        <div>{{minutesString}}</div>
      </div>
      <button @click.prevent="changeMinutes('dec', 15)">Dec</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      time: {
        hours: 9,
        minutes: 0
      }
    }
  },
  computed: {
    hoursString() {
      if (this.time.hours < 10) {
        return `0${this.time.hours}`
      }
      return `${this.time.hours}`
    },
    minutesString() {
      if (this.time.minutes < 10) {
        return `0${this.time.minutes}`
      }
      return `${this.time.minutes}`
    },
    timeString() {
      return `${this.hoursString}:${this.minutesString}`
    }
  },
  methods: {
    changeHours(direction, increment) {
      if (direction === 'dec') {
        increment = increment * -1
      }
      this.time.hours += increment
      if (this.time.hours > 23) {
        this.time.hours = 0
      } else if (this.time.hours < 0) {
        this.time.hours = 23
      }
      this.$emit('input', this.timeString)
    },
    changeMinutes(direction, increment) {
      if (direction === 'dec') {
        increment = increment * -1
      }
      this.time.minutes += increment
      if (this.time.minutes > 59) {
        this.time.minutes = 0
      } else if (this.time.minutes < 0) {
        this.time.minutes = 45
      }
      this.$emit('input', this.timeString)
    }
  },
  created() {

  }
}
</script>

