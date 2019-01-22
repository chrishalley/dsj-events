<template>
    <button class="button-circular"><span>{{icon}}</span></button>
</template>

<script>
export default {
  data() {
    return {
      icon: null
    }
  },
  props: {
    iconProp: {
      type: String
    }
  },
  created() {
    this.icon = this.iconProp
  },
  watch: {
    iconProp: function (newIcon, oldIcon) {
      this.icon = newIcon
    }
  }
}
</script>

