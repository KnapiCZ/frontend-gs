<script setup>
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import UserGeneric from './UserGeneric.vue';
    import json from '../../../assets/mocs/profilepost.json'
    import api from '@api';

    const baseUrl = await api()
</script>

<template>
    <Swiper
        :slides-per-view="1"
        :initial-slide="$route.params.initialPosition"
        :height="100"
        >
        <SwiperSlide v-for="object in myJson">
          <UserGeneric  :type="object.type" :sourcePost="baseUrl + object.thumbSRC"/> <!-- mozna by se sem hodilo dat jeste id postu at ho muzes pouzivat jako param-->
        </SwiperSlide>
      </Swiper>
</template>



<script>
export default {
  data: () => ({
    myJson: json,
  }),
}

</script>

<style scoped>
#MainContainer{
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: black;
    scroll-snap-align: start;

}

div .swiper{
    height: 100vh !important;
}

</style>