<template>
  <ul class="admin-menu">
      <AdminMenuItem v-for="(item, i) in navItems" :navItem="item" :key=i></AdminMenuItem>
  </ul>
</template>

<script>
import AdminMenuItem from '~/components/Sidebar/AdminMenuItem.vue'
export default {
  data() {
    return {
      navItems: [
        {
          label: 'Home',
          to: '/'
        },
        {
          label: 'Events',
          to: '/dashboard/events/'
        },
        {
          label: 'Bookings',
          to: '/dashboard/bookings/'
        },
        {
          label: 'Users',
          to: '/dashboard/users/'
        },
        {
          label: 'Block-outs',
          to: '/dashboard/block-outs/'
        },
        {
          label: 'Terms & Conditions',
          to: '/dashboard/terms/'
        }
      ]
    }
  },
  components: {
    AdminMenuItem
  }
}
</script>
