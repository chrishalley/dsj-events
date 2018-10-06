<template>
    <div>
        <p class="event-list__item-title">{{ dsjEvent.title }}</p>
        <p class="event-list__item-date mb-sm">{{ dsjEvent.startDateTime | unixToDate() }}, {{ dsjEvent.startDateTime | unixToTime() }} - {{ dsjEvent.endDateTime | unixToTime() }}</p>
        <hr>
        <p class="event-list__item-description">{{ dsjEvent.description }}</p>
        <button @click="editEvent">Edit</button>
    </div>
</template>

<script>
export default {
    props: ['dsjEvent'],
    methods: {
        editEvent() {
            this.$store.dispatch('setEditEvent', this.dsjEvent)
        }
    }
}
</script>

