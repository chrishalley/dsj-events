<template>
  <div>
    <section class="row">
      <div class="col-1-of-2 offset-3">
        <login-card></login-card>
      </div>
    </section>
    <!-- <section class="grid-test">
      <div class="row">
        <div class="col-1-of-2">1 of 2</div>
        <div class="col-1-of-2">1 of 2</div>
      </div>
      <div class="row">
        <div class="col-1-of-3">1 of 3</div>
        <div class="col-1-of-3">1 of 3</div>
        <div class="col-1-of-3">1 of 3</div>
      </div>
      <div class="row">
        <div class="col-2-of-3">2 of 3</div>
        <div class="col-1-of-3">1 of 3</div>
      </div>
      <div class="row">
        <div class="col-1-of-4">1 of 4</div>
        <div class="col-1-of-4">1 of 4</div>
        <div class="col-1-of-4">1 of 4</div>
        <div class="col-1-of-4">1 of 4</div>
      </div>
      <div class="row">
        <div class="col-1-of-4">1 of 4</div>
        <div class="col-1-of-4">1 of 4</div>
        <div class="col-2-of-4">2 of 4</div>
      </div>
      <div class="row">
        <div class="col-1-of-4">1 of 4</div>
        <div class="col-3-of-4">3 of 4</div>
      </div>
    </section> -->
  </div>

</template>

<script>
import LoginCard from '~/components/Login/LoginCard.vue'

export default {
  components: {
    LoginCard
  },
  layout: 'default'
}
</script>
