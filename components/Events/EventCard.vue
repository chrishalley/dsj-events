<template>
    <div>
        <p class="event-list__item-title">{{ dsjEvent.title }}</p>
        <p class="event-list__item-date mb-sm">{{ dsjEvent.dateTime | unixToDate() }} | {{ dsjEvent.dateTime | unixToTime() }}</p>
        <hr>
        <p class="event-list__item-unix mb-sm">{{ dsjEvent.dateTime }}</p>
        <p class="event-list__item-description">{{ dsjEvent.description }}</p>
    </div>
</template>

<script>
export default {
    props: ['dsjEvent']
}
</script>

