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
            let prevEventMonth, eventMonth, months, markup, date
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            prevEventMonth = months[0]
            this.events.forEach((event) => {
                let id = 1
                console.log(event)
                eventMonth = new Date(event.dateTime).getMonth()
                if (eventMonth !== prevEventMonth) {
                    this.renderMonthBanner(eventMonth, id)
                }
                console.log(date)
            })
        },
        renderMonthBanner(month, index) {
            let markup = `<h3>${month}</h3>`
            console.log(markup)
        }
    },
    components: {
        EventCard
    }
}
</script>