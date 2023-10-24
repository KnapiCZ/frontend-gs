<script setup lang="ts">
import HeadPart from './description/HeadPart.vue';
import MiddlePart from './description/MiddlePart.vue'
import MusicPart from './description/MusicPart.vue';

const props = defineProps<{
    userHandle?: string,
    description?: string,
    hashtags?: string,
    songname?: string
}>()


</script>


<template>
    <VContainer class="description">
        <HeadPart :user-handle="props.userHandle" />
        <MiddlePart :description="props.description" :hashtags="props.hashtags" />
        <MusicPart :songname="props.songname" />
    </VContainer>
</template>

<style scoped>
.description {
    max-width: 99%;
    height: 120px;
    background-color: rgba(50, 50, 50, 0.5);
    position: absolute;
    bottom: 56px;
    left: 0;
    overflow: hidden;
}
</style>