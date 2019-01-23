<template>
  <div>
    <form class="form">
      <section class="form-section">
        <div class="form-section__group form-section__group--row">
          <div class="form-section__group form-section__group--column">
            <h4>Start Date</h4>
            <RollingDatePicker allowPastDatesProp="false" :dateStringProp="this.startDateTime.startDate" v-model="startDateTime.startDate"></RollingDatePicker>
            <p>{{startDateTime.startDate}}</p>
            <h4>Start Time</h4>
            <TimePicker minTime="08:00" maxTime="23:00" minuteStepProp="15" :timeStringProp="this.startDateTime.startTime" v-model="startDateTime.startTime"></TimePicker>
            <p>ISO: {{startDateTimeISOString}}</p>
          </div>
          <div class="form-section__group form-section__group--column">
            <h4>End Date</h4>
            <RollingDatePicker allowPastDatesProp="false" :dateStringProp="this.endDateTime.endDate" v-model="endDateTime.endDate"></RollingDatePicker>
            <p>{{endDateTime.endDate}}</p>
            <h4>End Time</h4>
            <TimePicker minTime="08:00" maxTime="23:00" minuteStepProp="15" :timeStringProp="this.endDateTime.endTime" v-model="endDateTime.endTime"></TimePicker> 
            <p>ISO: {{endDateTimeISOString}}</p>
          </div>
        </div>
        <div class="form-section__group form-section__group--row">
          <button @click.prevent="selectDateTimes">Select</button>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import TimePicker from '~/components/Base/TimePicker/TimePicker.vue'
import RollingDatePicker from '~/components/Base/RollingDatePicker/RollingDatePicker.vue'
import utils from '~/utils/utils'

export default {
  data() {
    return {
      content: 'Content',
      formTitle: 'Choose Date & Time',
      startDateTime: {
        startDate: null,
        startTime: null
      },
      endDateTime: {
        endDate: null,
        endTime: null
      }
    }
  },
  computed: {
    startDateTimeISOString() {
      return this.dateTimeISOString(this.startDateTime.startDate, this.startDateTime.startTime)
    },
    endDateTimeISOString() {
      return this.dateTimeISOString(this.endDateTime.endDate, this.endDateTime.endTime)
    }
  },
  props: {
    props: {
      type: Object
    }
  },
  methods: {
    selectDateTimes() {
      this.$emit('emitComponentData', {
        startDateTime: this.startDateTimeISOString,
        endDateTime: this.endDateTimeISOString
      })
    },
    dateTimeISOString(dateString, timeString) {
      return `${dateString}T${timeString}:00.000Z`
    }
  },
  components: {
    TimePicker,
    RollingDatePicker
  },
  created() {
    this.$emit('created', {
      title: this.formTitle
    })
    const startDateTime = new Date(this.props.startDateTime)
    this.startDateTime.startDate = utils.dateStringFromISO(startDateTime.toISOString())
    this.startDateTime.startTime = utils.timeStringFromISO(startDateTime.toISOString())
    
    const endDateTime = new Date(this.props.endDateTime)
    this.endDateTime.endDate = utils.dateStringFromISO(endDateTime.toISOString())
    this.endDateTime.endTime = utils.timeStringFromISO(endDateTime.toISOString())
  }
}
</script>
