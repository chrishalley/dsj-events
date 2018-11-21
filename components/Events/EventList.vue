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
  props: ['events'],
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