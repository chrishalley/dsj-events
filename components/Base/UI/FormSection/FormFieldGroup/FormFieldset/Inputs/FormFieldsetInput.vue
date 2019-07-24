<template>
  <input :id="id" :class="classes" v-model="value" :type="type" :placeholder="placeholder" @blur="blur"/>
</template>

<script>
export default {
  name: 'FormFieldInput',
  data() {
    return {
      classes: null,
      type: null,
      placeholder: null,
      value: null,
      id: null
    }
  },
  props: {
    inputProps: {
      type: Object
    }
  },
  methods: {
    blur() {

    },
    setProps(props) {
      this.classes = props.classes
      this.type = props.type
      this.placeholder = props.placeholder
      this.id = props.id
    }
  },
  created() {
    this.setProps(this.inputProps)
    console.log(this.inputProps)
  },
  watch: {
    inputProps: function (newProps, oldProps) {
      this.setProps(newProps)
    }
  }
}
</script>
