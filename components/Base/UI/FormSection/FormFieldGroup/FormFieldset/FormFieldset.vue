<template>
  <fieldset class="form__fieldset">
    <label class="form__fieldset-label" :for="inputProps.id">{{label}}</label>
    <!-- <FormFieldsetInput :inputProps="inputProps"/> -->
    <component :is="component" :inputProps="inputProps"/>
    <!-- <textarea v-if="dataType === 'textarea'" rows="10" class="form__fieldset-input" v-model="value" :id="dataId" :type="dataType" :placeholder="dataPlaceholder" @blur="blur"></textarea>
    <input v-else class="form__fieldset-input" v-model="value" :id="dataId" :type="dataType" :placeholder="dataPlaceholder" @blur="blur"> -->
    <div class="form__fieldset-error">
      <p class="form__fieldset-error" v-for="(error, i) in errors" :key=i>{{error.message}}</p>
    </div>
  </fieldset>
</template>

<script>
import FormFieldsetInput from './Inputs/FormFieldsetInput.vue'
import FormFieldsetTextarea from './Inputs/FormFieldsetTextarea.vue'
export default {
  name: 'FormFieldset',
  data() {
    return {
      validate: false,
      value: null,
      errors: [],
      label: null,
      inputProps: {
        placeholder: null,
        type: null,
        classes: null,
        id: null
      }
    }
  },
  computed: {
    component() {
      return this.inputProps.type === 'textarea' ? FormFieldsetTextarea : FormFieldsetInput
    }
  },
  props: {
    fieldsetProps: {
      type: Object
    }   
  },
  methods: {
    blur() {
      if (this.dataValidate) {
        const emit = new Promise((resolve, reject) => {
          this.$emit('input', {
          property: this.dataId,
          value: this.value
          }, resolve)
        })
  
        emit.then(res => {
          this.errors = []
          if (res && res.length > 0) {
            res.forEach(error => {
              this.errors.push(error)
            })
          }
        })
      } 
    },
    setProps(props) {
      const {label, placeholder, type, id, classes, validate, component} = props
      this.inputProps = {
        placeholder,
        type,
        id,
        component
      }
      this.validate = validate
      this.label = label
    }
  },
  components: {
    FormFieldsetInput,
    FormFieldsetTextarea
  },
  watch: {
    fieldsetProps: function (newProps, oldProps) {
      this.setProps(newProps)
    }
  },
  created() {
    this.setProps(this.fieldsetProps)
  }
}
</script>