<template>
  <td class="timeslot-picker__table-cell timeslot-picker__table-cell input-cell">
    <button @click.prevent="selectSlot" :disabled="this.cellData.bookings.length === 1" :class="computedClasses">{{buttonLabel}}</button>
  </td>
</template>

<script>
export default {
  data() {
    return {
      cellData: null
    }
  },
  props: {
    cellProps: {
      type: Object,
      required: true
    }
  },
  computed: {
    computedClasses() {
      return {
        booked: this.cellData.bookings.length > 0,
        clash: this.cellData.bookings.length > 1,
        available: this.cellData.bookings.length === 0
      }
    },
    buttonLabel() {
      if (this.cellData.bookings.length > 0) {
        return 'N/A'
      }
      return 'Book'
    },
    clickable() {
      return this.cellData.bookings.length !== 1
    }
  },
  methods: {
    selectSlot() {
      this.$emit('selectSlot', {
          startDateTime: this.cellData.startDateTime,
          endDateTime: this.cellData.endDateTime
        })
    }
  },
  created() {
    this.cellData = {...this.cellProps}
  },
  watch: {
    cellProps: function(newProps, oldProps) {
      this.cellData = {...newProps}
    }
  }
}
</script>
