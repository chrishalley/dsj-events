<template>
  <div @click="dialogClose" class="overlay-dialog">
    <div @click.stop class="overlay-dialog-card">
      <header class="overlay-dialog-card-header">
        <h2 class="overlay-dialog-card-header__title">{{title}}</h2>
        <button class="overlay-dialog-card-header__close" @click="dialogClose">Close</button>
      </header>
      <component @created="onChildCreated" :toast="toast" :is="childComponent"></component>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
// import BookingPrices from '~/components/Public/Events/BookingPrices.vue'
import EventForm from '~/components/Events/EventForm.vue'

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
      console.log('childCreated()')
      if (!data) {
        return;
      } 
      console.log(this.childComponent)
      this.childComponent = data
    },
    // changeComponent(componentName) {
    //   const newComponent = new Vue.component(componentName.name, ...componentName)
    //   console.log(newComponent)
    //   // console.log(this.childComponent)
    //   this.childComponent = newComponent.name
    //   // console.log(this.childComponent)
    // }
  },
  computed: {
    title() {
      if (this.childComponent.title) {
        return this.childComponent.title
      }
    }
  },
  mounted() {
    this.childComponent = EventForm
  },
  created() {
    const body = document.querySelector('body')
    body.classList.add('noScroll')
  },
  // watch: {
  //   component: function(newComponent, oldComponent) {
  //     this.childComponent = newComponent
  //   }
  // }
}
</script>



