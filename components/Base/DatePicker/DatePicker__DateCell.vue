<template>
  <td class="date-picker__body-cell" :class="{'date-picker__body-cell--selected': selected}" @click="clickHandler">
    <p>{{data.date}}</p>
  </td>
</template>

<script>
import DatePicker__DateTile from './DatePicker__DateTile.vue'
export default {
  data() {
    return {
      selected: false
    }
  },
  props: ['data'],
  methods: {
    clickHandler() {
      if (!this.selected) {
        this.$emit('dateSelect', this.data)
      } else {
        this.$emit('dateDeselect', this.data)
      }
      this.selected = !this.selected
    }
  }
}
</script>
