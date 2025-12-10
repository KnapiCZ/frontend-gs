<script setup lang="ts">
import apiPost from "@/logic/API/apiPost"

import Description from "./PostParts/Description.vue"
import SideButtons from "./PostParts/SideButtons.vue"

const props = defineProps<{
    postId: number
}>()

let post = await apiPost("getPost", props.postId)
let postImg = post.media[0]
</script>

<template>
  <div id="MainContainer">
    <img
      class="postImage"
      :src="postImg"
    >
    <div id="overlay" />

    <SideButtons
      :post-id="props.postId"
      :user-id="post.author"
      :description="post.description"
    />
    <Description
      :user-id="post.author"
      :like-count="post.like_count"
      :description="post.description"
      hashtags="#be_real"
      :songname="'None'"
    />
  </div>
</template>

<style scoped>
#MainContainer {
    width: 100%;
    height: 100%;
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
    background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.1) 20%,
        rgba(0, 0, 0, 0.1) 60%,
        rgba(0, 0, 0, 0.5) 100%
    );
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
