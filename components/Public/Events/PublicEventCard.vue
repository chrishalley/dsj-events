<template>
  <div class="public-event-card">
    <div class="public-event-card__header">
      <img src="/palms.jpeg" alt="Alt text">
      <div class="public-event-card__header-title">
        <h3>{{event.title}}</h3>
        <p>Dates: something - something</p>
        <hr>
      </div>
    </div>
    <article class="public-event-card__description">
      <p>Chocolate cake sweet roll chocolate cake. Tart icing caramels ice cream carrot cake tart chupa chups tootsie roll. Macaroon marzipan halvah.</p>
      <p>Muffin chocolate bar powder. Dessert fruitcake icing cookie wafer chupa chups cake. Donut danish sesame snaps carrot cake muffin halvah dessert. Croissant jelly cupcake croissant bonbon fruitcake chocolate cake.</p>
      <nuxt-link class="public-event-card__read-more-link" to="">Read more</nuxt-link>
    </article>
  </div>
</template>

<script>
export default {
  props: ['event']
}
</script>
