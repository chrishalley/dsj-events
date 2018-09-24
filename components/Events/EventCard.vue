<template>
    <div>
        <button @click="editEvent">Edit</button>
        <p class="event-list__item-title">{{ dsjEvent.title }}</p>
        <p class="event-list__item-date mb-sm">Start date: {{ dsjEvent.startDateTime | unixToDate() }}</p>
        <p class="event-list__item-date mb-sm">Start Time: {{ dsjEvent.startDateTime | unixToTime() }}</p>
        <p class="event-list__item-date mb-sm">End Time: {{ dsjEvent.endDateTime | unixToTime() }}</p>
        <hr>
        <p class="event-list__item-description">{{ dsjEvent.description }}</p>
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

