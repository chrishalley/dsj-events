<template>
  <div class="sidebar">

    <button class="sidebar__toggle" @click="sidebarOpen = !sidebarOpen">
      <SVGIcon :iconProp="sidebarIcon"/>
    </button>
    <AdminMenu v-if="sidebarOpen"></AdminMenu>
  </div>
</template>

<script>
import AdminMenu from '~/components/Sidebar/AdminMenu.vue';
import SVGIcon from '~/components/Base/SVGIcon.vue';

export default {
  data() {
    return {
      sidebarOpen: false,
      
    }
  },
  computed: {
    sidebarIcon() {
      return this.sidebarOpen ? 'close' : 'menu'
    }
  },
  components: {
    AdminMenu,
    SVGIcon
  }
}
</script>

