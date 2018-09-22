<template>
    <div>
        <ul class="event-list">
            <li v-for="(dsjEvent, i) in events" :key="i" class="event-list__item">
                <event-card :dsjEvent="dsjEvent"></event-card>
            </li>
        </ul>
    </div>
</template>

<script>
import EventCard from '~/components/events/EventCard.vue'
export default {
    props: ['events'],
    created() {       
        this.eventListMonths() // Add month headers on created()
    },
    methods: {
        eventListMonths() { // Iterate through array of loaded events and add monthly headers
            let markup = `
            <h3>Monthtober</h3>
            `
        }
    },
    components: {
        EventCard
    }
}
</script>