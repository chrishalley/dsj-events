<template>
  <div class="timeslot-picker">
    <table class="timeslot-picker__table">
      <thead class="timeslot-picker__controller--year">
        <th class="timeslot-picker__table-column--control-column">Prev</th>
        <th colspan="7">Year Controller</th>
        <th class="timeslot-picker__table-column--control-column">Next</th>
      </thead>
      <thead class="timeslot-picker__controller--month">
        <th class="timeslot-picker__table-column--control-column">Prev</th>
        <th colspan="7">Month Controller</th>
        <th class="timeslot-picker__table-column--control-column">Next</th>
      </thead>
      <thead class="timeslot-picker__controller--week">
        <th class="timeslot-picker__table-column--control-column">Prev</th>
        <th v-for="(day, i) in days" :key=i>{{day | initial}}</th>
        <th class="timeslot-picker__table-column--control-column">Next</th>
      </thead>
      <tbody>
        <tr>
          <td class="timeslot-picker__table-column--control-column timeslot-picker__table-cell">
            <p class="control-column-name">Morning</p>
            <p>8:00<br />to<br />13:00</p>
          </td>
          <td v-for="(day, i) in days" :key=i class="timeslot-picker__table-cell">
            <TimeslotPickerCell></TimeslotPickerCell>
          </td>
        </tr>
        <tr>
          <td class="timeslot-picker__table-column--control-column timeslot-picker__table-cell">
            <p class="control-column-name">Afternoon</p>
            <p>13:00<br />to<br />18:00</p>
          </td>
          <td v-for="(day, i) in days" :key=i class="timeslot-picker__table-cell">
            <TimeslotPickerCell></TimeslotPickerCell>
          </td>
        </tr>
        <tr>
          <td class="timeslot-picker__table-column--control-column timeslot-picker__table-cell">
            <p class="control-column-name">Evening</p>
            <p>18:00<br />to<br />23:00</p>
          </td>
          <td v-for="(day, i) in days" :key=i class="timeslot-picker__table-cell">
            <TimeslotPickerCell></TimeslotPickerCell>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TimeslotPickerCell from './TimeslotPicker__Cell.vue'
export default {
  data() {
    return {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  },
  components: {
    TimeslotPickerCell
  }
}
</script>
