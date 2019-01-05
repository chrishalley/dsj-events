<template>
  <div class="date-picker">
    <header class="date-picker__control">
      <button @click.prevent="changeMonth('prev')">Prev</button>
      <p>{{visibleMonthString}}</p>
      <button @click.prevent="changeMonth('next')">Next</button>
    </header>
    <table class="calendar">
      <thead class="weekdayHeader">
        <tr>
          <th class="weekdayHeader__label" v-for="(weekday, i) in weekdays" :key="i">
            <p class="weekdayHeader__label-content">{{weekday | initial}}</p>
          </th>
        </tr>
      </thead>
      <tbody class="date-picker__body">
        <tr class="date-picker__body-row" v-for="week in calendarPageArray" :key="week.weekID">
          <DateCell :startDateProp="startDate" :cellData="date" @click="clickHandler" v-for="date in week.weekArray" :key="date.id"></DateCell>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DateCell from './DatePicker__DateCell.vue'
import DateTile from './DatePicker__DateTile.vue'
import uniqueID from 'lodash/uniqueID'
console.log(uniqueID)

// Set constants
const _monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const _monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default {
  data() {
    return {
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      visibleMonthDate: new Date(),
      startDate: null,
      endDate: null
    }
  },
  computed: {
    visibleMonthStartDay() {
      return this.visibleMonthDate.getDay()
    },
    visibleMonthDays() {
      let month = this.visibleMonthDate
      if (month.getFullYear() % 4 === 0 && month.getMonth() === 1) {
        // Case for February in a leap year
        return 29
      }
      return _monthDays[month.getMonth()]
    },
    visibleMonthString() {
      return _monthLabels[this.visibleMonthDate.getMonth()]
    },
    calendarPageArray() {
      // w = week number (row on calendar page, starting at 0)
      let calendarPageArray = []
      let monthStarted = false
      let monthEnded = false
  
      let dayOfMonth = 1
      for (let w = 0; w < 6 ; w++) {
        let weekArray = []
        // d = day of week (column on calendar page, starting at 0) {
          for (let d = 0; d < 7; d++) { // todo: make number of cells shown in calendar page dynamic depending on how many cells are required to show all days in current month
            let id = w.toString() + d.toString()
            let date = {
              id: id,
              currentMonth: false
            }

            if (!monthStarted && !monthEnded) {
              date.date = 'a'
              if (d === this.visibleMonthStartDay) {
                date.date = new Date(this.visibleMonthDate.getFullYear(), this.visibleMonthDate.getMonth(), dayOfMonth)
                date.currentMonth = true
                monthStarted = true
                dayOfMonth++
              } 

            } else if (monthStarted && !monthEnded) {
              date.date = new Date(this.visibleMonthDate.getFullYear(), this.visibleMonthDate.getMonth(), dayOfMonth)
              date.currentMonth = true
      
              if (dayOfMonth === this.visibleMonthDays) {
                monthEnded = true
              } else {
                dayOfMonth++
              }
            } else if (monthStarted && monthEnded) {
                
              date.date = 'z'
            } else {
              console.log('catch')
            }
            weekArray.push(date)         
        }
        calendarPageArray.push({
          weekID: 'week_' + w,
          weekArray: weekArray
        })
      }
      return calendarPageArray
    }
  },
  methods: {
    changeMonth(direction) {
      let increment = 1
      if (direction === 'prev') {
        increment = -1
      }
      this.visibleMonthDate = new Date(this.visibleMonthDate.setMonth(this.visibleMonthDate.getMonth() + increment))
    },
    clickHandler(date) {
      this.startDate = date
    }
  },
  components: {
    DateCell,
    DateTile
  },
created() {
    const initDate = new Date()
    this.visibleMonthDate = new Date(initDate.getFullYear(), initDate.getMonth(), 1)
  }
}
</script>