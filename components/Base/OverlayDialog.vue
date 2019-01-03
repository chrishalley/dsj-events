<template>
  <div @click="dialogClose" class="overlay-dialog">
    <div @click.stop class="overlay-dialog-card">
      <header class="overlay-dialog-card-header">
        <h2 class="overlay-dialog-card-header__title">{{title}}</h2>
        <button class="overlay-dialog-card-header__close" @click="dialogClose">Close</button>
      </header>
      <component @created="onChildCreated" :toast="toast" :is="component"></component>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childComponent: {},
      toast: {
        status: 'warning',
        message: null
      }
    }
  },
  props: ['component'],
  methods: {
    dialogClose() {
      const body = document.querySelector('body')
      body.classList.remove('noScroll')
      this.$emit('dialogClose')
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
        console.log(this.childComponent.title)
        return this.childComponent.title
      }
    }
  },
  created() {
    console.log('overlay created')
    const body = document.querySelector('body')
    body.classList.add('noScroll')
  }
}
</script>



