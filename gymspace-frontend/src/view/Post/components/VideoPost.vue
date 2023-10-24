<script setup lang="ts">
import DescriptionFYP from '../../ForYouPage/components/DescriptionFYP.vue';
import SideButtons from '../../ForYouPage/components/SideButtons.vue';

const props = defineProps<{
    sourcePost?: string,
    userHandle?: string,
    description?: string,
    hashtags?: string,
    songname?: string
}>()

function playPauseVideo() {
    let videos = document.querySelectorAll("video");
    videos.forEach((video) => {
        // We can only control playback without insteraction if video is mute
        video.muted = true;
        // Play is a promise so we need to check we have it
        let playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then((_) => {
                let observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (
                                entry.intersectionRatio !== 1 &&
                                !video.paused
                            ) {
                                video.pause();
                            } else if (video.paused) {
                                video.play();
                            }
                        });
                    },
                    { threshold: 0.2 }
                );
                observer.observe(video);
            });
        }
    });
}

playPauseVideo()
// And you would k

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