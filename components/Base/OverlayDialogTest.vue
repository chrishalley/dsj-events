<template>
  <div @click="dialogClose" class="overlay-dialog">
    <div @click.stop class="overlay-dialog-card">
      <header class="overlay-dialog-card-header">
        <h2 class="overlay-dialog-card-header__title">{{title}}</h2>
        <button class="overlay-dialog-card-header__close" @click="dialogClose">Close</button>
      </header>
      <component @swapChild="swapChild" @created="onChildCreated" :toast="toast" :is="component"></component>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      component: null,
      title: null,
      toast: {
        status: 'warning',
        message: null
      }
    }
  },
  props: ['childComponent'],
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
      this.title = data.title
    },
    swapChild(component) {
      console.log('swapChild()', component)
      this.component = component
    }
  },
  computed: {
  },
  created() {
    const body = document.querySelector('body')
    body.classList.add('noScroll')
    this.component = this.childComponent
  },
  watch: {
    childComponent: function() {
      console.log('childComponent prop changed')
    }
  }
}
</script>



