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
          <th class="weekdayHeader__label" v-for="(weekday, i) in weekdays" :key=i>
            <p class="weekdayHeader__label-content">{{weekday | initial}}</p>
          </th>
        </tr>
      </thead>
      <tbody class="date-picker__body">
        <tr class="date-picker__body-row" v-for="(row, i) in generateCalendarPageDates" :key=i>
          <DateCell @dateSelect="dateSelected" @dateDeselect="dateDeselected" :data="row[i]" v-for="(cell, i) in row" :key=i></DateCell>
        </tr>
      </tbody>
    </table>
    <p>{{startDateParsed}}</p>
    <div class="debug">
      <p>visibleMonthDate{{visibleMonthDate}}</p>
      <div>{{generateCalendarPageDates}}</div>
    </div>
  </div>
</template>

<script>
import DateCell from './DatePicker__DateCell.vue'
import DateTile from './DatePicker__DateTile.vue'

export default {
  data() {
    return {
      visibleMonthDate: '',
      inc: 0,
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      startDate: null,

    }
  },
  methods: {
    changeMonth(direction) {
      let inc = 1
      if (direction === 'prev') {
        inc = -1
      }
      const currentMonth = this.visibleMonthDate.getMonth()
      this.visibleMonthDate = new Date(this.visibleMonthDate.setMonth(currentMonth + inc))
    },
    monthIndexToString(val) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return months[val]
    },
    dateSelected(payload) {
      console.log(payload);
      this.startDate = payload;
    },
    dateDeselected(payload) {
      console.log('clear');
      this.startDate = null
    }
  },
  computed: {
    startDateParsed() {
      let date = this.startDate
      if (!date) {
        return ''
      }
      date = new Date(date.year, date.month, date.date)
      const offset = date.getTimezoneOffset()
      const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000))
      return adjustedDate
    },
    visibleMonthString() {
      return this.monthIndexToString(this.visibleMonthDate.getMonth()) + ' ' + this.visibleMonthDate.getFullYear()
    },
    daysInVisibleMonth() {
      return new Date(this.visibleMonthDate.getFullYear(), this.visibleMonthDate.getMonth() + 1, 1, -12).getDate()
    },
    visibleMonthDayStart() {
      return this.visibleMonthDate.getDay()
    },
    daysArrayInVisibleMonth() {
      let array = [];
      for (let i = 0; i < this.numberOfDateCells; i++) {
        const dayIndex = i;
        const weekNum = Math.floor(dayIndex / 7)
        array.push(dayIndex - (7 * (weekNum)))
      }
      return array;
    },
    numberOfDateCells() {
      // todo: Dynamically change number of table cells needed depending on length of month and positioning on grid
      // console.log('this.daysInVisibleMonth / 7: ', this.daysInVisibleMonth / 7);
      // if (this.daysInVisibleMonth / 7 > 4) {
      //   return 5 * 7;
      // } else {
      //   return 4 * 7;
      // }
      return 42;
    },
    generateVisibleMonthDates() {
      let array = []
      for (let i = 0; i < this.daysInVisibleMonth; i++) {
        array.push({
          year: this.visibleMonthDate.getFullYear(),
          month: this.visibleMonthDate.getMonth(),
          day: this.visibleMonthDate.getDay(),
          date: i + 1
        })
      }
      return array;
    },
    generateEmptyCalendarCells() {
      let cleanArray = []
      console.log('cleanArray: ', cleanArray)
      
      let array = []
      const weekNum = Math.ceil(this.numberOfDateCells / 7)
      console.log('array1: ', array)

        for (let i = 0; i < weekNum; i++) {
          for (let j = 0; j < this.weekdays.length; j++) {
            console.log()
            const dayIndex = j
            const weekNum = Math.floor(dayIndex / 7)
            const entry = {day: j, calendarRow: i}
            console.log(entry)
            cleanArray.push(entry)
          }
          console.log('loop Array: ', array)
        }
        // cleanArray = array
        console.log('cleanArray2: ', cleanArray)
        return cleanArray
    },
    generateCalendarPageDates() {
      let array = this.generateEmptyCalendarCells;
      // let someOtherArray = []
      console.log('genCalendarPages: ', array);


      const startingIndex = this.generateVisibleMonthDates[0].day
      let dataIndex = 0
      for (let k = startingIndex; dataIndex <= this.generateVisibleMonthDates.length; k++) {
        array[k] = Object.assign(array[k], this.generateVisibleMonthDates[dataIndex])
        dataIndex++
      }

      let newArray = [];
      for(let l = 0; l < 6; l++) {
        let tempArray = array.filter(curr => {
          return curr.calendarRow === l
        })
        newArray.push(tempArray)
      }

      return newArray
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