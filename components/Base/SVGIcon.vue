<template>
  <svg class="svg-icon" viewBox="0 0 100 100">
    <use :xlink:href="iconString"></use>
  </svg>
</template>

<script>
export default {
  data() {
    return {
      icon: null
    }
  },
  computed: {
    iconString() {
      return `/svg/icons.svg#icon-${this.icon}`
    }
  },
  props: {
    iconProp: {
      type: String,
      required: true
    }
  },
  created() {
    this.icon = this.iconProp
  },
  watch: {
    iconProp: function(newIcon, oldIcon) {
      this.icon = newIcon
    }
  }
}
</script>

