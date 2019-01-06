<template>
  <div>
    <div class="card">
      <form class="form">
        <h3 class="form-section__heading">Terms &amp; Conditions</h3>
        <section class="form-section">
          <div class="form-section__group form-section__group--column">
            <fieldset class="form__fieldset">
              <label class="form__fieldset-label" for="standardConditions">Standard Conditions</label>
              <textarea class="form__fieldset-input" name="standardConditions" id="" cols="30" rows="10" v-model="standardConditions"></textarea>
            </fieldset>
          </div>
          <div class="form-section__group form-section__group--column">
            <button @click.prevent="saveStandardConditions()">Save Changes</button>
          </div>
        </section>
      </form>
      <div v-html="markdownParsed"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
console.log(marked)

export default {
  layout: 'admin',
  computed: {
    markdownParsed() {
      return marked(this.standardConditions, {sanitize: true})
    }
  },
  methods: {
    saveStandardConditions() {
      this.$store.dispatch('updateStandardConditions', this.standardConditions)
        .then(() => {
          console.log('Success!')
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  asyncData(context) {
    return context.$axios.get(`${process.env.baseURL}/statics/termsAndConditions`)
      .then(res => {
        return {standardConditions: res.data}
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>
