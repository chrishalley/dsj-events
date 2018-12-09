<template>
  <ul class="users-list__tile-list">
    <li class="users-list__tile-info users-list__tile-info--name">{{user.firstName}} {{user.lastName}}</li>
    <li class="users-list__tile-info"><a :href="mailto">{{user.email}}</a></li>
    <li class="users-list__tile-info">{{user.dateApplied | DDMMYYYY}}</li>
    <li class="users-list__tile-info">{{user.role | initialUpperCase}}</li>
    <li class="users-list__tile-info"><button @click.prevent="editUser">Edit</button></li>
  </ul>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    editUser() {
      this.$emit('editUser', this.user._id)
    }
  },
  filters: {

  },
  computed: {
    mailto() {
      return `mailto:${this.user.email}`
    }
  }
}
</script>
