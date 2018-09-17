<template>
    <div>
        <h3>Events List</h3>
        <ul>
            <li v-for="(dsjEvent, i) in dsjEvents" :key="i">
                <p>Title: {{ dsjEvent.title }}</p>
                <p>Description: {{ dsjEvent.description }}</p>
                <p>Date: {{ dsjEvent.date }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['dsjEvents']
}
</script>

