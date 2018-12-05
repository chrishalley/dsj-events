<template>
  <div>
    <app-header></app-header>
    <nuxt/>
    <global-toast></global-toast>
  </div>
</template>

<script>
  import AppHeader from '~/components/Header.vue'
  import GlobalToast from '~/components/Base/GlobalToast.vue'

  export default {
    components: {
      AppHeader,
      GlobalToast
    }
  }
</script>
