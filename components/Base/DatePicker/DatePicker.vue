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
    <p>{{prevMonthDays}}</p>
  </div>
</template>

<script>
import spacetime from 'spacetime'
import DateCell from './DatePicker__DateCell.vue'

// Set constants
const _monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const _monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// Get local timezone offset from GMT in hours
const _localOffsetFromGMT = new Date().getTimezoneOffset() / 60

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
    nextMonthDays() {
      return this.siblingMonthDays('next')
    },
    prevMonthDays() {
      return this.siblingMonthDays('prev')
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
      let dayOfNextMonth = 1
      let dayOfPrevMonth = this.prevMonthDays - (this.visibleMonthStartDay - 1)

      for (let w = 0; w < 6 ; w++) {
        let weekArray = []
        // d = day of week (column on calendar page, starting at 0) {
          for (let d = 0; d < 7; d++) { // todo: make number of cells shown in calendar page dynamic depending on how many cells are required to show all days in current month
            let id = w.toString() + d.toString()
            let date = {
              id: id,
              currentMonth: false,
              bst: false
            }

            if (!monthStarted && !monthEnded) {
              // Adjusted for GMT
              date.date = new Date(this.visibleMonthDate.getFullYear(), this.visibleMonthDate.getMonth() - 1 , dayOfPrevMonth, this.visibleMonthDate.getHours() - _localOffsetFromGMT)

              // Check for BST
              if (this.bst(date.date)) {
                date.bst = true
              }

              dayOfPrevMonth++
              if (d === this.visibleMonthStartDay) {
                // Adjusted for GMT
                date.date = new Date(this.visibleMonthDate.getFullYear(), this.visibleMonthDate.getMonth(), dayOfMonth, this.visibleMonthDate.getHours() - _localOffsetFromGMT)
                
                // Check for BST
                if (this.bst(date.date)) {
                  date.bst = true
                }

                date.currentMonth = true
                monthStarted = true
                dayOfMonth++
              } 

            } else if (monthStarted && !monthEnded) {
              // Adjusted for GMT
              date.date = new Date(this.visibleMonthDate.getFullYear(), this.visibleMonthDate.getMonth(), dayOfMonth, this.visibleMonthDate.getHours() - _localOffsetFromGMT)

              // Check for BST
              if (this.bst(date.date)) {
                date.bst = true
              }

              date.currentMonth = true
      
              if (dayOfMonth === this.visibleMonthDays) {
                monthEnded = true
              } else {
                dayOfMonth++
              }
            } else if (monthStarted && monthEnded) {
              // Adjusted for GMT
              date.date = new Date(this.visibleMonthDate.getFullYear(), this.visibleMonthDate.getMonth() + 1, dayOfNextMonth, this.visibleMonthDate.getHours() - _localOffsetFromGMT)

              // Check for BST
              if (this.bst(date.date)) {
                date.bst = true
              }

              dayOfNextMonth++
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
      console.log(JSON.stringify(calendarPageArray, null, 2))
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
    clickHandler(data) {
      this.startDate = data
      console.log(this.startDate)
      const year = this.startDate.date.getFullYear()
      const month = this.startDate.date.getMonth() < 10 ? `0${this.startDate.date.getMonth()+1}` : this.startDate.date.getMonth()+1
      const date = this.startDate.date.getDate() < 10 ? `0${this.startDate.date.getDate()}` : this.startDate.date.getDate()
      const formattedDate = `${year}-${month}-${date}`
      console.log(formattedDate)
      this.$emit('input', formattedDate)
    },
    siblingMonthDays(direction) {
      let increment = 1;
      if (direction === 'prev') {
        increment = -1
      }
      let month = new Date(this.visibleMonthDate.getFullYear(), this.visibleMonthDate.getMonth() + increment, 1)
      if (month.getFullYear() % 4 === 0 && month.getMonth() === 1) {
        // Case for February in a leap year
        return 29
      }
      return _monthDays[month.getMonth()]
    },
    bstStart(year) {
      // find the last day in March for date's year
      let day = new Date(year, 2, 31)
      // is this day a Sunday? If not, loop through preceding week until it is.
      for (let i = 0; i < 7; i++) {
        if (day.getDay() !== 0) {
          day.setDate(day.getDate() - 1)
        } else {
          return day
        }
      }
    },
    bstEnd(year) {
      // find the last day in October for date's year
      let day = new Date(year, 9, 31)
      // is this day a Sunday? If not, loop through preceding week until it is.
      for (let i = 0; i < 7; i++) {
        if (day.getDay() !== 0) {
          day.setDate(day.getDate() - 1)
        } else {
          return day
        }
      }
    },
    bst(date) {
      const bstStartTime = this.bstStart(date.getFullYear()).getTime()
      const bstEndTime = this.bstEnd(date.getFullYear()).getTime()
      const dateTime = date.getTime()

      return dateTime >= bstStartTime && dateTime <= bstEndTime
      
    }
  },
  components: {
    DateCell
  },
created() {
    // get local time now (timezone-relative)
    const localDate = new Date()

    // construct new date object for local time and set calendar to start of current month for current timezone
    this.visibleMonthDate = new Date (localDate.getFullYear(), localDate.getMonth(), 1)
  }
}
</script>