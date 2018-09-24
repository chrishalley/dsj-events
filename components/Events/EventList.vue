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
                    startDateTime: 1514799000000,
                    endDateTime: 15148000000,
                    id: 1
                },
                {
                    title: 'Test Event Two',
                    description: 'Lorem ipsum dolor si amet',
                    startDateTime: 1520800000000,
                    endDateTime: 1520900000000,
                    id: 2
                },
                {
                    title: 'Test Event Three',
                    description: 'Lorem ipsum dolor si amet',
                    startDateTime: 1520799000000,
                    endDateTime: 1521500000000,
                    id: 3
                },
                {
                    title: 'Test Event Four',
                    description: 'Lorem ipsum dolor si amet',
                    startDateTime: 1524799000000,
                    endDateTime: 1524850000000,
                    id: 4
                },
                {
                    title: 'Test Event Five',
                    description: 'Lorem ipsum dolor si amet',
                    startDateTime: 1528799000000,
                    endDateTime: 1528900000000,
                    id: 5
                },
                {
                    title: 'Test Event Six',
                    description: 'Lorem ipsum dolor si amet',
                    startDateTime: 1514999000000,
                    endDateTime: 1515500000000,
                    id: 6
                }
            ]
        }
    },
    // props: ['events'],
    mounted() {       
        this.eventListMonths() // Add month headers on created()
    },
    methods: {
        eventListMonths() { // Iterate through array of loaded events and add monthly headers
            let prevEventMonth, eventMonth, months, markup
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            prevEventMonth = ''
            this.events.forEach((event) => {
                eventMonth = months[new Date(event.startDateTime).getMonth()]
                if (eventMonth !== prevEventMonth) {
                    this.renderMonthBanner(eventMonth, event.id)
                }

                prevEventMonth = eventMonth
            })
        },
        renderMonthBanner(month, id) {
            let markup, newMonthEvent
            markup = `<h3 class="event-list__month-banner">${month}</h3>`
            newMonthEvent = document.getElementById(id)
            newMonthEvent.insertAdjacentHTML('beforebegin', markup)
        }
    },
    components: {
        EventCard
    }
}
</script>