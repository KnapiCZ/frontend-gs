<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"

import apiPost from "@/logic/API/apiPost"
import { userDataStore } from "@/stores/UserDataStore"

import FullSizePost from "../components/PostContainers/FullSizePost.vue"

let userStore = userDataStore()
let postIds = await apiPost("recommendedPosts", 1)
</script>

<template>
  <Swiper
    :slides-per-view="1"
    direction="vertical"
  >
    <SwiperSlide v-for="data in postIds">
      <FullSizePost :post-id="data" />
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
div.swiper {
    height: calc(100% - 56px) !important;
    width: 100%;
}
</style>
