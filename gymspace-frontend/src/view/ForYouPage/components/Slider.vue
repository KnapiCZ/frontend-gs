<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { userDataStore } from '@/stores/UserDataStore';
import FullSizePost from '../../Post/components/PostContainers/FullSizePost.vue';
import apiPost from '@/logic/API/apiPost';

let userStore = userDataStore()
let postIds = await apiPost('recommendedPosts', userStore.loggedUserId)
</script>

<template>
  <Swiper :slides-per-view="1" direction="vertical">
    <SwiperSlide v-for="data in postIds">
      <FullSizePost :postId="data" />
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
div.swiper {
  height: calc(100vh - 50px) !important;
}
</style>