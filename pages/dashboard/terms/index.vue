<template>
  <div>
    <h2>Terms &amp; Conditions</h2>
    <div class="card">
      <form action="">
        <fieldset>
          <label class="form__label" for="standardConditions">Standard Conditions</label>
          <textarea name="standardConditions" id="" cols="30" rows="10" v-model="standardConditions"></textarea>
        </fieldset>
        <button @click.prevent="saveStandardConditions()">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
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
