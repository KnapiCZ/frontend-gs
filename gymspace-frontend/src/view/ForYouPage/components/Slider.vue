<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import VideoPost from '../../Post/components/fyp/VideoPost.vue';
import json from '../../../assets/mocs/fypPosts.json'
import apiPost from '@/logic/API/apiPost';

const props = defineProps<{
  keyStart: number
}>()



const baseUrl = await apiPost()
</script>

<template>
  <Swiper :slides-per-view="1" direction="vertical">
    <SwiperSlide v-for="(object, index) in myJson">
      <VideoPost :sourcePost="baseUrl + object.vidSrc" :user-handle="object.userHandle" :description="object.description"
        :hashtags="object.hashtags" :songname="object.music" :key="index + props.keyStart" />
    </SwiperSlide>
  </Swiper>
</template>



<script lang="ts">
export default {
  data: () => ({
    myJson: json,
  }),
}

</script>

<style scoped>
div .swiper {
  height: 100vh !important;
}
</style>