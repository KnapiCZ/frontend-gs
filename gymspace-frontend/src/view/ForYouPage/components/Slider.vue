<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { userDataStore } from '@/stores/UserDataStore';
import FullSizePost from '../../Post/components/PostContainers/FullSizePost.vue';
import apiPost from '@/logic/API/apiPost';

let postData = await apiPost("allUserPostsDetail", 1)

//! bude ziskavat id postu ktere se maji zobrazit a pak id bude posilat dal do videopost (video post se musi prejmenovat nemusi to byt jen video zvladne to i fotky)

let userStore = userDataStore()


</script>

<template>
  <Swiper :slides-per-view="1" direction="vertical">
    <SwiperSlide v-for="data in userStore.userPostsId">
      <FullSizePost :key="'post' + data + userStore.componentKey" :postId="(data as unknown as number)" />
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
div .swiper {
  height: 100vh !important;
}
</style>