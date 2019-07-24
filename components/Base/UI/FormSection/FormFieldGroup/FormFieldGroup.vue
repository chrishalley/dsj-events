<template>
  <div class="form-section__group form-section__group--column">
    <!-- <FormFieldset :fieldsetProps="{label: 'First name', placeholder: 'eg. John', type: 'text', id: 'client.firstName', validate: false, classes: ['form-fieldset__input']}" @input="inputHandler"></FormFieldset>
    <FormFieldset :fieldsetProps="{label: 'Last name', placeholder: 'eg. Smith', type: 'text', id: 'client.lastName', validate: false, classes: ['form-fieldset__input']}" @input="inputHandler"></FormFieldset> -->
    <FormFieldset v-for="(fieldset, i) in fieldsets" :fieldsetProps="fieldset" :key="i"/>
   </div>
</template>

<script>
import FormFieldset from './FormFieldset/FormFieldset.vue'

export default {
  name: 'FormFieldGroup',
  data() {
    return {
      fieldsets: null
    }
  },
  props: {
    fieldGroupProps: {
      type: Object
    }
  },
  methods: {
    setProps(props) {
      const {fieldsets} = props
      this.fieldsets = fieldsets
    }
  },
  components: {
    FormFieldset
  },
  created() {
    this.setProps(this.fieldGroupProps)
  },
  watch: {
    fieldGroupProps: function(newProps, oldProps) {
      this.setProps(newProps)
    }
  }
}
</script>

