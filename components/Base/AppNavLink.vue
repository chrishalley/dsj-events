<template>
  <li v-if="showLink" @click.prevent="onClick" class="app-nav-item">
    <nuxt-link v-if="link.type === 'nuxtLink'" class="app-nav-item__link" :to="link.route">
      <SVGIcon class="app-nav-item__link-icon" :iconProp="link.icon"></SVGIcon>
      <p class="app-nav-item__link-text">{{link.text}}</p>
    </nuxt-link>
    <button v-else class="app-nav-item__link">
      <SVGIcon class="app-nav-item__link-icon" :iconProp="link.icon"></SVGIcon>
      <p class="app-nav-item__link-text">{{link.text}}</p>
    </button>
  </li>
</template>

<script>
import SVGIcon from '~/components/Base/SVGIcon.vue'
export default {
  name: 'AppNavLink',
  data() {
    return {
      link: null
    }
  },
  props: {
    linkData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick() {
      if (this.link.clickEvent) {
        this.link.clickEvent()
      }
    }
  },
  computed: {
    showLink() {
      if (this.link.condition !== undefined) {
        return this.link.condition
      }
      return true
    }
  },
  components: {
    SVGIcon
  },
  watch: {
    linkData: function(newLink, oldLink) {
      this.link = newLink
    }
  },
  created() {
    this.link = this.linkData
  }
}
</script>