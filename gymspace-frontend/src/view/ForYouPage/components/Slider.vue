<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import VideoPost from '../../Post/components/VideoPost.vue';
import json from '../../../assets/mocs/fypPosts.json'
import apiUser from '@/logic/API/apiUser';

const props = defineProps<{
  keyStart: number
}>()



const baseUrl = await apiUser()
</script>

<template>
  <Swiper :slides-per-view="1" :initial-slide="($route.params.initialPosition as unknown as number)" direction="vertical">
    <SwiperSlide v-for="(object, index) in myJson">
      <VideoPost :sourcePost="baseUrl + object.vidSrc" :user-handle="object.userHandle" :description="object.description"
        :hashtags="object.hashtags" :songname="object.music" :key="index + props.keyStart" />
      <!-- mozna by se sem hodilo dat jeste id postu at ho muzes pouzivat jako param-->
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