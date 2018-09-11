<template>
    <p :class="toast.status" v-if="toast.message !== null">{{ toast.message }}</p>
</template>

<script>
export default {
    props: ['toast']
}
</script>

<style scoped>

p {
    margin-top: 2rem;
    font-size: 1.6rem;
}

.good {
    color: green
}

.warning {
    color: orange
}

.error {
    color: red
}

</style>


