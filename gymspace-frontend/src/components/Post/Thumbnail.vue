<script setup>
  import { SwiperSlide } from 'swiper/vue'
  import 'swiper/css'
  import api from '@api';
  const props = defineProps({
  ImageSource: String,
  postID: Number,
  })
  const baseUrl = await api()
  const postUrl = `${baseUrl}${props.ImageSource}`
</script>



<template>
  <swiper-slide>
    <button> <!-- ROUTE tag-->
      <img :src="postUrl" alt=""> <!-- API thumbnail of post src-->
    </button>
  </swiper-slide>
</template>

<style scoped>
.swiper-slide{
    max-width: 60vw;
}

img{
    max-width: 60vw;
    max-height: 40vh;
}
</style>
