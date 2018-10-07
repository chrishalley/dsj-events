<template>
    <div class="image-upload">
        <div class="image-upload__img-wrapper" v-if="!dialogOpen">
            <div class="image-upload__add-img">
                <button @click.prevent="dialogOpen = !dialogOpen">{{ imageBtnLabel }}</button>
            </div>
            <img :src="imageUrl" alt="">
        </div>
        <div class="img-upload__attach-dialog" v-if="dialogOpen">
            <p @click="dialogOpen = !dialogOpen">close</p>
            <label for="imageUrl">Image URL</label>
            <input type="text" name="imageUrl" v-model="imageUrl">
            <button @click.prevent="setImageUrl">Use</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: '',
            dialogOpen: false
        }
    },
    methods: {
        setImageUrl() {
            this.$store.dispatch('saveImageToCloudinary', this.imageUrl)
            .then(() => {
                this.dialogOpen = false
            })
        }
    },
    computed: {
        imageBtnLabel() {
            return this.imageUrl !== '' ? 'Change' : 'Add'
        }
    }
}
</script>
