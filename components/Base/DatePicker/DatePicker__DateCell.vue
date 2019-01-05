<template>
  <td class="date-picker__body-cell" :class="cellClasses" @click="clickHandler" :id="data.id">
    <p>{{dateNumber}}</p>
  </td>
</template>

<script>
export default {
  data() {
    return {
      startDate: null,
      data: {}
    }
  },
  computed: {
    dateNumber() {
      if (this.data.date === undefined) {
        return null
      }
      if (this.data.date.getDate) {
        return this.data.date.getDate()
      } 
        return this.data.date
    },
    cellClasses() {
      return {
        'date-picker__body-cell--selected': this.selected,
        'current-month': this.data.currentMonth
      }
    },
    selected() {
      if (this.startDate) {
        return new Date(this.data.date).getTime() === new Date(this.startDate.date).getTime()
      }
      return false
    }
  },
  methods: {
    clickHandler() {
      this.$emit('click', this.data)
    }
  },
  props: {
    cellData: {
      type: Object,
      required: true
    },
    startDateProp: {
      type: Object
    }
  },
  mounted() {
    this.data = this.cellData
    this.startDate = this.startDateProp
  },
  watch: {
    cellData: function(newData, oldData) {
      this.data = newData
    },
    startDateProp: function(newData, oldData) {
      this.startDate = this.startDateProp
    }
  }
}

</script>
