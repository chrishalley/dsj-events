<template>
  <div class="carousel">
      <div class="carousel__image-frame">
        <img :src="activeImage.url" :alt="activeImage.altText">
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeImage: {
        altText: 'This is the static image alt text',
        url: '/palms.jpeg'
      },
      images: []
    }
  },
  computed: {
    activeImageSetter() {
      if (!this.images.length > 0) {
        return {
          altText: 'This is the static image alt text',
          url: '~/static/palm.jpeg'
        }
      }
    }
  }
}
</script>

<style scoped>
.carousel {
  display: flex;
  align-items: center;
  background-color: #222;
  height: 400px;
  overflow: hidden;
}

.carousel__image-frame img {
  display: block;
  max-width: 100%;
  flex-shrink: 0;
}

</style>
