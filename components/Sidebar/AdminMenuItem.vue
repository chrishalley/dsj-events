<template>
  <li class="admin-menu__item">
    <nuxt-link :to="navItem.to">{{navItem.label}}</nuxt-link>
    <div class="indicator"></div>
  </li>
</template>

<script>
export default {
  props: ['navItem']
}
</script>
