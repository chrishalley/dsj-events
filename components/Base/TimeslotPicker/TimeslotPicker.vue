<template>
  <div class="timeslot-picker">
    <table class="timeslot-picker__table">
      <thead class="timeslot-picker__controller timeslot-picker__controller--year">
        <th class="timeslot-picker__table-column--control-column">
          <!-- <ButtonCircular iconProp="A" @click.prevent="changeView('year', -1)"></ButtonCircular> -->
          <button @click.prevent="changeView('year', -1)">Prev</button>
        </th>
        <th colspan="7">{{pageStartDate.getFullYear()}}</th>
        <th class="timeslot-picker__table-column--control-column">
          <!-- <ButtonCircular iconProp="A" @click.prevent="changeView('year', 1)"></ButtonCircular> -->
          <button @click.prevent="changeView('year', 1)">Next</button>
        </th>
      </thead>
      <thead class="timeslot-picker__controller timeslot-picker__controller--month">
        <th class="timeslot-picker__table-column--control-column">
          <!-- <ButtonCircular iconProp="A" @click.prevent="changeView('month', -1)"></ButtonCircular> -->
          <button @click.prevent="changeView('month', -1)">Prev</button>
        </th>
        <th colspan="7">{{pageStartDate.getMonth() | monthArrayToString}}</th>
        <th class="timeslot-picker__table-column--control-column">
          <!-- <ButtonCircular iconProp="A" @click.prevent="changeView('month', 1)"></ButtonCircular> -->
          <button @click.prevent="changeView('month', 1)">Next</button>
        </th>
      </thead>
      <thead class="timeslot-picker__controller timeslot-picker__controller--week">
        <th class="timeslot-picker__table-column--control-column">
          <!-- <ButtonCircular iconProp="A" @click.prevent="changeView('week', -1)"></ButtonCircular> -->
          <button @click.prevent="changeView('week', -1)">Prev</button>
        </th>
        <TimeslotPickerDateLabel :dateProp="day" v-for="day in pickerPage.labels" :key="day.getTime()"></TimeslotPickerDateLabel>
        <th class="timeslot-picker__table-column--control-column">
          <!-- <ButtonCircular iconProp="A" @click.prevent="changeView('week', 1)"></ButtonCircular> -->
          <button @click.prevent="changeView('week', 1)">Next</button>
        </th>
      </thead>
      <tbody>
        <tr class="timeslot-picker__table-row--morning">
          <td class="timeslot-picker__table-column--control-column timeslot-picker__table-column--control-column--left timeslot-picker__table-cell">
            <p class="control-column-name">Morning</p>
            <p class="control-column-time">8am - 1pm</p>
          </td>
          <TimeslotPickerCell v-for="day in pickerPage.morningSessions" :cellProps="day" :key="day.morningStartDateTime" @selectSlot="chooseDateTime"></TimeslotPickerCell>
          <td class="timeslot-picker__table-column--control-column timeslot-picker__table-cell">
            <p class="control-column-name">Morning</p>
            <p class="control-column-time">8am - 1pm</p>
          </td>
        </tr>
        <tr class="timeslot-picker__table-row--afternoon">
          <td class="timeslot-picker__table-column--control-column timeslot-picker__table-column--control-column--left timeslot-picker__table-cell">
            <p class="control-column-name">Afternoon</p>
            <p class="control-column-time">1pm - 6pm</p>
          </td>
          <TimeslotPickerCell v-for="day in pickerPage.afternoonSessions" :cellProps="day" :key="day.afternoonStartDateTime" @selectSlot="chooseDateTime"></TimeslotPickerCell>
          <td class="timeslot-picker__table-column--control-column timeslot-picker__table-cell">
            <p class="control-column-name">Afternoon</p>
            <p class="control-column-time">1pm - 6pm</p>
          </td>
        </tr>
        <tr class="timeslot-picker__table-row--evening">
          <td class="timeslot-picker__table-column--control-column timeslot-picker__table-column--control-column--left timeslot-picker__table-cell">
            <p class="control-column-name">Evening</p>
            <p class="control-column-time">6pm - 11pm</p>
          </td>
          <TimeslotPickerCell v-for="day in pickerPage.eveningSessions" :cellProps="day" :key="day.eveningStartDateTime" @selectSlot="chooseDateTime"></TimeslotPickerCell>
          <td class="timeslot-picker__table-column--control-column timeslot-picker__table-cell">
            <p class="control-column-name">Evening</p>
            <p class="control-column-time">6pm - 11pm</p>
          </td>
        </tr>
      </tbody>
    </table>
    <OverlayDialog :childComponentProps="dialog.props" :component="dialog.component" v-if="dialog.open" @emitDialogData="setDateTimeData" @dialogClose="dialog.open=false"/>
  </div>
</template>

<script>
import TimeslotPickerCell from './TimeslotPicker__Cell.vue'
import TimeslotPickerDateLabel from './TimeslotPicker__DateLabel.vue'
import OverlayDialog from '~/components/Base/OverlayDialog.vue'
import DateTimePicker from '~/components/Base/TimeslotPicker/TimeslotPicker_DateTimePicker.vue'
import ButtonCircular from '~/components/Base/UI/ButtonCircular.vue'

import utils from '~/utils/utils'

export default {
  data() {
    return {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      currentViewArray: null,
      pageStartDate: null,
      bookedEvents: [],
      userEvents: [],
      dialog: {
        open: false,
        component: null,
        props: null
      }
    }
  },
  computed: {
    pickerPage() {
      return this.renderPickerPage(this.pageStartDate)
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
    renderPickerPage(startDate) {
      let pickerPage = {}
      let labelArray = []
      for (let k = 0; k < 7; k++) {
        let date = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate() + k, startDate.getUTCHours()));
        labelArray.push(date)
      }
      pickerPage.labels = labelArray
      for (let j = 0; j < 3; j++) {
        const sessions = [
          { name: 'morning', UTCStartHour: 8, UTCEndHour: 13 },
          { name: 'afternoon', UTCStartHour: 13, UTCEndHour: 18 },
          { name: 'evening', UTCStartHour: 18, UTCEndHour: 23 }
        ]
        let sessionArray = []
        for (let i = 0; i < 7; i++) {
        let date = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate() + i, startDate.getUTCHours()));
        const sessionStartDateTime = new Date(date).setUTCHours([sessions[j].UTCStartHour])
        const sessionEndDateTime = new Date(date).setUTCHours([sessions[j].UTCEndHour])
        sessionArray.push({
          date: new Date(date),
          [sessions[j].name + 'StartDateTime']: sessionStartDateTime,
          [sessions[j].name + 'EndDateTime']: sessionEndDateTime,
          bookings: this.checkBookings(sessionStartDateTime, sessionEndDateTime, this.bookedEvents)
          })
        }
        pickerPage[sessions[j].name + 'Sessions'] = sessionArray
      }
      console.log('***Array*** ', pickerPage)
      return pickerPage;
    },
    chooseDateTime(props) {
      this.dialog.component = DateTimePicker
      this.dialog.props = props
      this.dialog.open = true
    },
    setDateTimeData(data) {
      console.log('emitData() ', data)
      this.events.push({
        id: 'someUniqueID',
        ...data
      })
      console.log(this.events)
    },
    checkBookings(startDateTime, endDateTime, bookedEvents) {
      // Checks start and end date times of slots against array of existing events to see if any overlap and returns array of matches
      let array = this.bookedEvents.filter(event => {
        if (
          (event.startDateTime > startDateTime && event.startDateTime < endDateTime) ||
          (event.endDateTime > startDateTime && event.endDateTime < endDateTime) ||
          (event.startDateTime < startDateTime && event.endDateTime > endDateTime)
        ) {
          return event
        }
      })
      return array
    }
  },
  components: {
    TimeslotPickerCell,
    TimeslotPickerDateLabel,
    DateTimePicker,
    OverlayDialog,
    ButtonCircular
  },
  created() {
    const date = new Date()
    this.setPageStartDate(date)
    this.$store.dispatch('getEvents')
      .then(events => {
        this.bookedEvents = events
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>
