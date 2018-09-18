<template>
    <div>
        <ul class="event-list">
            <li v-for="(dsjEvent, i) in events" :key="i" class="event-list__item">
                <p class="event-list__item-title">{{ dsjEvent.title }}</p>
                <p class="event-list__item-date mb-sm">{{ dsjEvent.date }}</p>
                <p class="event-list__item-description">{{ dsjEvent.description }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['events']
}
</script>