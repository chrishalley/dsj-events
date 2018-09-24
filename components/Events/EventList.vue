<template>
    <div>
        <ul class="event-list">
            <li v-for="(dsjEvent) in events" :key="dsjEvent.id" :ref="dsjEvent.id" class="event-list__item" :id="dsjEvent.id">
                <event-card :dsjEvent="dsjEvent"></event-card>
            </li>
        </ul>
    </div>
</template>

<script>
import EventCard from '~/components/events/EventCard.vue'
export default {
    data() {
        return {
            events: [
                {
                    title: 'Test Event One',
                    description: 'Lorem ipsum dolor si amet',
                    dateTime: 1514799000000,
                    id: 1
                },
                {
                    title: 'Test Event Two',
                    description: 'Lorem ipsum dolor si amet',
                    dateTime: 1520800000000,
                    id: 2
                },
                {
                    title: 'Test Event Three',
                    description: 'Lorem ipsum dolor si amet',
                    dateTime: 1520799000000,
                    id: 3
                },
                {
                    title: 'Test Event Four',
                    description: 'Lorem ipsum dolor si amet',
                    dateTime: 1524799000000,
                    id: 4
                },
                {
                    title: 'Test Event Five',
                    description: 'Lorem ipsum dolor si amet',
                    dateTime: 1528799000000,
                    id: 5
                },
            ]
        }
    },
    // props: ['events'],
    created() {       
        this.eventListMonths() // Add month headers on created()
    },
    methods: {
        eventListMonths() { // Iterate through array of loaded events and add monthly headers
            let prevEventMonth, eventMonth, months, markup
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            prevEventMonth = months[0]
            this.events.forEach((event) => {
                let id = event.id
                eventMonth = months[new Date(event.dateTime).getMonth()]
                if (eventMonth !== prevEventMonth) {
                    this.renderMonthBanner(eventMonth, id)
                }
            })
        },
        renderMonthBanner(month, id) {
            let markup, element
            markup = `<h3>${month}</h3>`
            // element = this.$refs.id
            console.log('Element: ', element)
            // element.insertAdjacentHTML('beforebegin', markup)
        }
    },
    components: {
        EventCard
    }
}
</script>