<template>
  <section class="form-section">
    <h3 class="form-section__heading">{{sectionTitle}}</h3>
    <div class="form-section__group form-section__group--row">
      <FormFieldGroup v-for="(fieldGroup, i) in fieldGroups" :fieldGroupProps="fieldGroup" :key="i"/>
    </div>
  </section>
</template>

<script>
import FormFieldGroup from './FormFieldGroup/FormFieldGroup.vue'
export default {
  name: 'FormSection',
  data() {
    return {
      fieldGroups: null,
      sectionTitle: null
    }
  },
  props: {
    formSectionProps: {
      type: Object
    }
  },
  methods: {
    setProps(props) {
      const {fieldGroups, sectionTitle} = props
      this.fieldGroups = fieldGroups
      this.sectionTitle = sectionTitle
    }
  },
  components: {
    FormFieldGroup
  },
  created() {
    this.setProps(this.formSectionProps)
    console.log(this.formSectionProps)
  },
  watch: {
    sectionProps: function (newProps, oldProps) {
      this.setProps(newProps)
    }
  }
}
</script>
