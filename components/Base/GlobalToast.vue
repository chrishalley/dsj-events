<template>
  <transition name="globalToast">
    <div :class="statusClass" class="global-toast" v-if="globalToast.message">
      <div class="global-toast__status"></div>
      <div class="global-toast__message">
        <h3>{{statusClass | initialUpperCase}}</h3>
        <p>{{globalToast.message}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters({
      globalToast: 'getGlobalToast'
    }),
    statusClass() {
      return this.globalToast.status
    }
  }
}
</script>

<style scoped>
  .globalToast-enter {
    opacity: 0;
    transform: translateY(100%);
  }
  
  .globalToast-enter-to {
    opacity: 1;
    transform: translateY(0%);
  }
  
  .globalToast-enter-active {
    transition: opacity 500ms ease-in-out, transform 500ms cubic-bezier(.22,.78,.41,1.24);
  }
  
  .globalToast-leave {
    opacity: 1;
    transform: translateY(0%);
  }
  
  .globalToast-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
  
  .globalToast-leave-active {
    transition: opacity 500ms ease-in-out, transform 500ms cubic-bezier(.8,-0.39,.89,.65);
  }


</style>


