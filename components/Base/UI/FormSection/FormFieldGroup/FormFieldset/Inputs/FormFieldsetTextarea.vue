<template>
  <textarea :classes="classes" :name="id" :id="id" cols="30" rows="10" :placeholder="placeholder"></textarea>
</template>

<script>
export default {
  data() {
    return {
      placeholder: null,
      classes: null,
      id: null
    }
  },
  props: {
    inputProps: {
      type: Object
    }
  },
  methods: {
    setProps(props) {
      const {placeholder, classes, id} = props
      this.placeholder = placeholder
      this.classes = classes
      this.id = id
    }
  },
  created() {
    this.setProps(this.inputProps)
  },
  watch: {
    inputProps: function(newProps, oldProps) {
      this.setProps(newProps)
    }
  }
}
</script>

