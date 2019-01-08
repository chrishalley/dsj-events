<template>
  <div>
    <h1>Overlay Child 2</h1>
    <p>Carrot cake pudding chocolate bar carrot cake dragée lollipop chocolate cake carrot cake dessert. Dessert bonbon oat cake jujubes jelly beans. Gummi bears pudding brownie jelly-o chocolate cake. Sugar plum candy jelly cheesecake croissant. Gummi bears danish jelly gummi bears brownie cupcake cake. Macaroon lemon drops topping cupcake sweet roll sweet roll powder.</p>
    <button @click.prevent="loadChildOne">Child 1</button>
  </div>
</template>

<script>
import OverlayChildOne from '~/components/Base/OverlayChildOne.vue'
export default {
  data() {
    return {

    }
  },
  methods: {
    loadChildOne() {
      this.$emit('swapChild', OverlayChildOne)
    }
  }
}
</script>
