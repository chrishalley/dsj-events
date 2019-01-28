<template>
  <input :class="compClasses" v-model="compValue" :id="compId" :type="compType" :placeholder="compPlaceholder" @blur="blur"/>
</template>

<script>
export default {
  name: 'FormFieldInput',
  data() {
    return {
      compClasses: null,
      compId: null,
      compType: null,
      compPlaceholder: null,
      compValue: null
    }
  },
  props: {
    inputProps: {
      type: Object,
        classes: {type: Array},
        id: {type: String},
        type: {type: String, default: 'text'},
        placeholder: {type: String}
      }
  },
  methods: {
    blur() {

    }
  },
  created() {
    console.log('props: ', this.props)
  },
  watch: {

  }
}
</script>
