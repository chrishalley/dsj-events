<template>
  <div class="sidebar">
    <button class="sidebar__toggle" @click="sidebarOpen = !sidebarOpen" v-html="sidebarLabel"></button>
    <AdminMenu v-if="sidebarOpen"></AdminMenu>
  </div>
</template>

<script>
import AdminMenu from '~/components/Sidebar/AdminMenu.vue';
export default {
  data() {
    return {
      sidebarOpen: false,
      
    }
  },
  computed: {
    sidebarLabel() {
      return this.sidebarOpen ? '&times;' : 'Menu'
    }
  },
  components: {
    AdminMenu
  }
}
</script>

