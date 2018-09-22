<template>
    <div>
        <ul class="event-list">
            <li v-for="(dsjEvent, i) in events" :key="i" class="event-list__item">
                <p class="event-list__item-title">{{ dsjEvent.title }}</p>
                <p class="event-list__item-date mb-sm">{{ dsjEvent.dateTime | unixToDate() }} | {{ dsjEvent.dateTime | unixToTime() }}</p>
                <hr>
                <p class="event-list__item-unix mb-sm">{{ dsjEvent.dateTime }}</p>
                <p class="event-list__item-description">{{ dsjEvent.description }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
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
    }
}
</script>