<template>
  <fieldset class="form__fieldset">
    <label class="form__fieldset-label" :for="dataId">{{dataLabel}}</label>
    <FormFieldsetInput :props="inputProps"/>
    <!-- <textarea v-if="dataType === 'textarea'" rows="10" class="form__fieldset-input" v-model="value" :id="dataId" :type="dataType" :placeholder="dataPlaceholder" @blur="blur"></textarea>
    <input v-else class="form__fieldset-input" v-model="value" :id="dataId" :type="dataType" :placeholder="dataPlaceholder" @blur="blur"> -->
    <div class="form__fieldset-error">
      <p class="form__fieldset-error" v-for="(error, i) in errors" :key=i>{{error.message}}</p>
    </div>
  </fieldset>
</template>

<script>
import FormFieldsetInput from './Inputs/FormFieldsetInput.vue'
export default {
  data() {
    return {
      validate: false,
      value,
      errors: [],
      inputProps: {
        label: null,
        placeholder: null,
        type: null,
        id: null
      }
      dataLabel: null,
      dataPlaceholder: null,
      dataType: null,
      dataId: null,
      dataValidate: true,
      value: null,
      errors: []
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    id: {
      type: String, 
      required: true
    },
    validate: {
      type: String,
      default: 'true'
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
    }
  },
  components: {
    FormFieldsetInput
  },
  watch: {
    label: function(newValue, oldValue) {
      this.dataLabel = newValue
    },
    placeholder: function(newValue, oldValue) {
      this.dataPlaceholder = newValue
    },
    type: function(newValue, oldValue) {
      this.dataType = newValue
    },
    id: function(newValue, oldValue) {
      this.dataId = newValue
    },
    validate: function(newValue, oldValue) {
      this.dataValidate = newValue === 'true'
    }
  },
  created() {
    this.dataLabel = this.label
    this.dataPlaceholder = this.placeholder
    this.dataType = this.type
    this.dataId = this.id
    this.dataValidate = this.validate === 'true'
  }
}
</script>