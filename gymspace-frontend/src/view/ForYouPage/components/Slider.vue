<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import VideoPost from '../../Post/components/fyp/VideoPost.vue';
import apiPost from '@/logic/API/apiPost';
import apiUser from '@/logic/API/apiUser';

let postData = await apiPost("allUserPostsDetail", 1)
let userData = await apiUser("smallUserProfile", 1)
const baseUrl = await apiPost()

//! bude ziskavat id postu ktere se maji zobrazit a pak id bude posilat dal do videopost (video post se musi prejmenovat nemusi to byt jen video zvladne to i fotky)


</script>

<template>
  <Swiper :slides-per-view="1" direction="vertical">
    <SwiperSlide v-for="post in postData.posts">
      <VideoPost :sourcePost="baseUrl + post.media[0]" :postId="post.id" :userId="userData.id"
        :user-handle="userData.handle" :description="postData.description" :hashtags="'sss'" :songname="'none'"
        :key="postData.id" />
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
div .swiper {
  height: 100vh !important;
}
</style>