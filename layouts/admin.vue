<template>
  <div class="admin-body">
    <aside>
      <Sidebar></Sidebar>
    </aside>
    <main>
      <Header></Header>
      <nuxt/>
    </main>
  </div>
</template>

<script>
  import Header from '~/components/Header.vue'
  import Sidebar from '~/components/Sidebar/Sidebar.vue'

  export default {
    components: {
      Header,
      Sidebar
    },
    middleware: ['checkAuth', 'auth']
  }
</script>
