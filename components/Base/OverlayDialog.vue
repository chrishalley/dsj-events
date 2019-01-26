<template>
  <div @click="dialogClose" class="overlay-dialog">
    <div @click.stop class="overlay-dialog-card">
      <header class="overlay-dialog-card-header">
        <h2 class="overlay-dialog-card-header__title">{{title}}</h2>
        <button class="overlay-dialog-card-header__close" @click.prevent="dialogClose">
          <SVGIcon iconProp="close"></SVGIcon>
        </button>
      </header>
      <component :props="childComponentProps" @created="onChildCreated" @emitComponentData="emitDialogData" :toast="toast" :is="component"></component>
    </div>
  </div>
</template>

<script>
import SVGIcon from '~/components/Base/SVGIcon.vue'
export default {
  name: 'OverlayDialog',
  data() {
    return {
      childComponent: {},
      toast: {
        status: 'warning',
        message: null
      }
    }
  },
  props: ['component', 'childComponentProps'],
  methods: {
    dialogClose() {
      const body = document.querySelector('body')
      body.classList.remove('noScroll')
      this.$emit('dialogClose')
    },
    emitDialogData(data) {
      this.$emit('emitDialogData', data)
      this.dialogClose()
    },
    onChildCreated(data) {
      if (!data) {
        return;
      } 
      this.childComponent = data
    }
  },
  computed: {
    title() {
      if (this.childComponent.title) {
        return this.childComponent.title
      }
    }
  },
  components: {
    SVGIcon
  },
  created() {
    const body = document.querySelector('body')
    body.classList.add('noScroll')
  }
}
</script>



