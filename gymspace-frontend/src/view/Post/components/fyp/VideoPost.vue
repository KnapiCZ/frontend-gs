<script setup lang="ts">
import DescriptionFYP from '@/view/ForYouPage/components/DescriptionFYP.vue';
import SideButtons from '@/view/ForYouPage/components/SideButtons.vue';

const props = defineProps<{
    sourcePost?: string,
    userHandle?: string,
    description?: string,
    hashtags?: string,
    songname?: string
}>()

</script>

<template>
    <div id="MainContainer">
        <video preload="true" autoplay="true" loop="true" muted="true" :src="props.sourcePost"></video>
        <SideButtons />
        <DescriptionFYP :user-handle="props.userHandle" :description="props.description" :hashtags="props.hashtags"
            :songname="props.songname" />
    </div>
</template>

<style scoped>
#MainContainer {
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: black;
    background-color: black;
    scroll-snap-align: start;

}

video {
    width: 100%;
    height: 100%;
    pointer-events: none;

}
</style>