<template>
  <div class="upcoming-events">
    <h1 class="section-title">Upcoming Events</h1>
    <div class="upcoming-events__month-switcher">
      <button class="prev" @click="prevMonth"><span>&lsaquo;</span></button>
      <span class="month">{{monthSwitcherText}}</span>
      <button class="next" @click="nextMonth"><span>&rsaquo;</span></button>
    </div>
    <ul>
      <PublicEventCard :event="event" v-for="(event, i) in events" :key=i></PublicEventCard>
    </ul>
  </div>

</template>

<script>
import EventCard from '~/components/Events/EventCard.vue'
import PublicEventCard from '~/components/Public/Events/PublicEventCard.vue'
import dateFns from 'date-fns'
export default {
  data() {
    return {
      monthSwitcherActiveMonth: new Date()
    }
  },
  props: ['events'],
  components: {
    EventCard,
    PublicEventCard
  },
  computed: {
    monthSwitcherText() {
      return dateFns.format(this.monthSwitcherActiveMonth, 'MMMM YYYY')
    }
  },
  // mounted() {       
  //   this.eventListMonths() // Add month headers on created()
  // },
  methods: {
    nextMonth() {
      this.monthSwitcherActiveMonth = dateFns.addMonths(this.monthSwitcherActiveMonth, 1);
      this.getEventsByMonth()
    },
    prevMonth() {
      this.monthSwitcherActiveMonth = dateFns.addMonths(this.monthSwitcherActiveMonth, -1);
      this.getEventsByMonth()
    },
    getEventsByMonth() {
      this.$store.dispatch('getEventsByMonth', this.monthSwitcherText)
        .then(res => {
          console.log('Component res: ', res)
        })
        .catch(e => {
          console.log('Component e: ', e)
        })
    }
    // eventListMonths() { // Iterate through array of loaded events and add monthly headers
    //   let prevEventMonth, eventMonth, months, markup
    //   months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    //   prevEventMonth = ''
    //   this.events.forEach((event) => {
    //     eventMonth = months[new Date(event.startDateTime).getMonth()]
    //     if (eventMonth !== prevEventMonth) {
    //       this.renderMonthBanner(eventMonth, event.id)
    //     }

    //     prevEventMonth = eventMonth
    //   })
    // },
    // renderMonthBanner(month, id) {
    //   let markup, newMonthEvent
    //   markup = `<h3 class="event-list__month-banner">${month}</h3>`
    //   newMonthEvent = document.getElementById(id)
    //   newMonthEvent.insertAdjacentHTML('beforebegin', markup)
    // }
  }
}
</script>