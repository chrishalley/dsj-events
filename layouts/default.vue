<template>
  <div>
    <app-header></app-header>
    <nuxt/>
  </div>
</template>

<script>
  import AppHeader from '~/components/Header.vue'

  export default {
    components: {
      AppHeader
    }
  }
</script>
