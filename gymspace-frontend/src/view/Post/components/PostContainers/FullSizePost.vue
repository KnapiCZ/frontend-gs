<script setup lang="ts">
import apiPost from '@/logic/API/apiPost';
import apiUser from '@/logic/API/apiUser';
import Description from './PostParts/Description.vue';
import SideButtons from './PostParts/SideButtons.vue';
import { useIonRouter } from '@ionic/vue';

const props = defineProps<{
    postId: number
}>()


let post = (await apiPost("getUserPost", props.postId)).post
let creatorInfo = await apiUser("smallUserProfile", post.author)

let baseUrl = await apiPost()

let postImg = baseUrl + post.media[0]



function checkImage() {
    if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(postImg)) {
        return true
    }
    else { return false }
}



</script>

<template>
    <div id="MainContainer">
        <img v-if="checkImage()" class="postImage" :src="postImg">
        <video v-else autoplay="true" loop="true" preload="true" muted="true" :src="postImg"></video>
        <div id="overlay"></div>

        <SideButtons :postId="props.postId" :userId="creatorInfo.id" />
        <Description :user-handle="creatorInfo.handle" :description="creatorInfo.description" hashtags="#be_real"
            :songname="'None'" />
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
    scroll-snap-align: start;

}

#overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 20%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.5) 100%);
}

video {
    width: 100%;
    height: 100%;
    pointer-events: none;

}

.postImage {
    width: auto;
    height: 100%;
    margin: auto;
}
</style>