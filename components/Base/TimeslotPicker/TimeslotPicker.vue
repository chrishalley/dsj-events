<template>
  <div class="timeslot-picker">
    <table class="timeslot-picker__table">
      <thead class="timeslot-picker__controller--year">
        <th class="timeslot-picker__table-column--control-column">
          <button @click.prevent="changeView('year', -1)">Prev</button>
        </th>
        <th colspan="7">{{pageStartDate.getFullYear()}}</th>
        <th class="timeslot-picker__table-column--control-column">
          <button @click.prevent="changeView('year', 1)">Next</button>
        </th>
      </thead>
      <thead class="timeslot-picker__controller--month">
        <th class="timeslot-picker__table-column--control-column">
          <button @click.prevent="changeView('month', -1)">Prev</button>
        </th>
        <th colspan="7">{{pageStartDate.getMonth() | monthArrayToString}}</th>
        <th class="timeslot-picker__table-column--control-column">
          <button @click.prevent="changeView('month', 1)">Next</button>
        </th>
      </thead>
      <thead class="timeslot-picker__controller--week">
        <th class="timeslot-picker__table-column--control-column">
          <button @click.prevent="changeView('week', -1)">Prev</button>
        </th>
        <TimeslotPickerDateLabel :dateProp="day" v-for="(day, i) in pickerPageArray" :key=i></TimeslotPickerDateLabel>
        <th class="timeslot-picker__table-column--control-column">
          <button @click.prevent="changeView('week', 1)">Next</button>
        </th>
      </thead>
      <tbody>
        <tr>
          <td class="timeslot-picker__table-column--control-column timeslot-picker__table-cell">
            <p class="control-column-name">Morning</p>
            <p>8:00<br />to<br />13:00</p>
          </td>
          <TimeslotPickerCell v-for="day in pickerPageArray" :eventProp="day.morning"  :key="day.date + ' morning'"></TimeslotPickerCell>
        </tr>
        <tr>
          <td class="timeslot-picker__table-column--control-column timeslot-picker__table-cell">
            <p class="control-column-name">Afternoon</p>
            <p>13:00<br />to<br />18:00</p>
          </td>
          <TimeslotPickerCell v-for="day in pickerPageArray" :eventProp="day.afternoon" :key="day.date + ' afternoon'"></TimeslotPickerCell>
        </tr>
        <tr>
          <td class="timeslot-picker__table-column--control-column timeslot-picker__table-cell">
            <p class="control-column-name">Evening</p>
            <p>18:00<br />to<br />23:00</p>
          </td>
          <TimeslotPickerCell v-for="day in pickerPageArray" :eventProp="day.evening" :key="day.date + ' evening'"></TimeslotPickerCell>
        </tr>
      </tbody>
      <div>{{pickerPageArray}}</div>
    </table>
  </div>
</template>

<script>
import TimeslotPickerCell from './TimeslotPicker__Cell.vue'
import TimeslotPickerDateLabel from './TimeslotPicker__DateLabel.vue'
import utils from '~/utils/utils'

export default {
  data() {
    return {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      currentViewArray: null,
      pageStartDate: null
    }
  },
  computed: {
    pickerPageArray() {
      return this.renderPickerPageArray(this.pageStartDate)
    }
  },
  methods: {
    changeView(period, inc) {
      const oldDate = this.pageStartDate
      let newDate
      if (period === 'year') {
        console.log('year', inc)
        newDate = new Date(oldDate.setFullYear(oldDate.getFullYear() + inc))
      } else if (period === 'month') {
        console.log('month', inc)
        newDate = new Date(oldDate.setMonth(oldDate.getMonth() + inc))
        
      } else if (period === 'week') {
        console.log('week', inc)
        newDate = new Date(oldDate.setDate(oldDate.getDate() + (inc * 7)))

      } else {
        console.log('function broken')
      }
      this.setPageStartDate(newDate)
      console.log(this.pageStartDate)
    },
    setPageStartDate(date) {
      let offset = new Date().getTimezoneOffset() / 60
      let tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), -offset)
      for (let i = 0; i < 7 ;i++) {
        let weekday = tempDate.getUTCDay()
        if (weekday === 1) {
          this.pageStartDate = tempDate
          break
        } else {
          tempDate = new Date(tempDate.setUTCDate(tempDate.getUTCDate() - 1))
        }
      }
    },
    renderPickerPageArray(startDate) {
      let array = []
      for (let i = 0; i < 7; i++) {
        let date = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate() + i);
        // console.log(`date ${i}: `, date)
        array.push({
          date,
          morning: 'morning event',
          afternoon: 'afternoon event',
          evening: 'evening event'
          })
        // console.log('date: ', date)
      }
      return array;
    }
  },
  components: {
    TimeslotPickerCell,
    TimeslotPickerDateLabel
  },
  created() {
    const date = new Date()
    this.setPageStartDate(date)
  }
}
</script>
