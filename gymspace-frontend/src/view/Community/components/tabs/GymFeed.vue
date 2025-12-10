<script setup lang="ts">
import Thumbnail from '@/view/Post/components/Thumbnail.vue';

const props = defineProps<{
    gymId: number
    items: number[]
}>()

</script>

<template>
    <div class="grid-container">
        <Thumbnail v-for="data in items" :postID="data" :path="'/gym/' + props.gymId + '/feed/' + data"
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
</style>
