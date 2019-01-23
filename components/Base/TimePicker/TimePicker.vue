<template>
  <div class="time-picker">
    <div class="time-picker__panel">
      <button @click.prevent="changeValue('hours', hourStep, 1)">Inc</button>
      <div class="time-picker__panel-display">
        <div>{{hoursString}}</div>
      </div>
      <button @click.prevent="changeValue('hours', hourStep, -1)">Dec</button>
    </div>
    <div class="divider">
      <p>:</p>
    </div>
    <div class="time-picker__panel">
      <button @click.prevent="changeValue('minutes', minuteStep, 1)">Inc</button>
      <div class="time-picker__panel-display">
        <div>{{minutesString}}</div>
      </div>
      <button @click.prevent="changeValue('minutes', minuteStep, -1)">Dec</button>
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
      },
      maxHour: 23,
      maxMinute: 59,
      minHour: 0,
      minMinute: 0,
      hourStep: parseInt(this.hourStepProp),
      minuteStep: parseInt(this.minuteStepProp)
    }
  },
  props: {
    timeStringProp: {
      type: String
    },
    minTime: {
      type: String
    },
    maxTime: {
      type: String
    },
    hourStepProp: {
      type: String,
      default: "1"
    },
    minuteStepProp: {
      type: String,
      default: "1"
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
    changeValue(unit, step, direction) {
      if (unit === 'hours') {
        this.time.hours += (direction * step)
        if (this.time.hours > this.maxHour) {
          this.time.hours = this.minHour
        } else if (this.time.hours < this.minHour) {
          this.time.hours = this.maxHour
        }
      } else if (unit === 'minutes') {
        this.time.minutes += (direction * step)
        if (this.time.minutes > 59) {
          this.time.minutes = 0
          this.time.hours += this.hourStep
        } else if (this.time.minutes < 0) {
          this.time.minutes = 60 - Math.abs(step)
          this.time.hours -= this.hourStep
        }
      } else {
        console.log('timePicker broken')
      }
      
      if (this.time.hours === this.maxHour && this.time.minutes > this.maxMinute) {
        this.time.minutes = this.maxMinute
      }
      
      if (this.time.hours < this.minHour) {
        this.time.hours = this.minHour
        this.time.minutes = this.minMinute
      }

      this.$emit('input', this.timeString)
    },
    setMaxTime(string) {
      this.maxHour = parseInt(string.slice(0,2))
      this.maxMinute = parseInt(string.slice(3,5))
    },
    setMinTime(string) {
      this.minHour = parseInt(string.slice(0,2))
      this.minMinute = parseInt(string.slice(3,5))
    },
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
  watch: {
    timeStringProp: function(newProp, oldProp) {
      this.time.hours = parseInt(newProp.slice(0,2))
      this.time.minutes = parseInt(newProp.slice(3,5))
    }
  },
  created() {
    if (this.timeStringProp) {
      this.time.hours = parseInt(this.timeStringProp.slice(0,2))
      this.time.minutes = parseInt(this.timeStringProp.slice(3,5))
    }
    if (this.minTime) {
      this.setMinTime(this.minTime)
    }
    if (this.maxTime) {
      this.setMaxTime(this.maxTime)
    }
  }
}
</script>

