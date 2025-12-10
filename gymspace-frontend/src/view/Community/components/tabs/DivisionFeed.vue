<script setup lang="ts">
import Thumbnail from '@/view/Post/components/Thumbnail.vue';

const props = defineProps<{
    divisionId: number
    items: number[]
}>()

</script>

<template>
    <div class="grid-container">
        <Thumbnail v-for="data in items" :postID="data" :path="'/division/' + props.divisionId + '/feed/' + data"
            class="grid-item" />
    </div>
</template>

<style scoped>
.grid-container {
    display: grid;
    width: 100%;
    grid-template-columns: 33% 33% 33%;
    margin: 0;
}

.grid-item {
    text-align: center;
    aspect-ratio: 1/1.5;
    object-fit: cover;
    width: fit-content;
    margin: 1px;
}

@media screen and (min-width: 1200px) {
    .grid-container {
        display: grid;
        width: 30%;
        grid-template-columns: 33% 33% 33%;
    }
}
</style>
