<script setup>
    import { VCombobox } from 'vuetify/lib/components/index.mjs';
    import GymButton from '../components/GymButton.vue';
    import Thumbnail from '../../Post/components/Thumbnail.vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import api from '@api';

    const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))
    const baseUrl = await api()
    const gyms = await api("gymsMember", loggedUser.id)
    let recommended_posts = await api('recommendedPosts', loggedUser.id);
    console.log(recommended_posts)
    let postData = new Array()
    let data
    for (let postNumber = 1; postNumber <= recommended_posts.posts.length; postNumber++) {
      data = await api("getUserPost", postNumber)
      postData.push(data)
    }

</script>

<template>
    <VCombobox
      label="Search"
      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      variant='outlined'
    /> <!--   :items vrati to co uzivatel hleda-->
    <h2>Your Gyms</h2>
    <GymButton v-if="gyms != null" v-for="(gym, index) in gyms" :key="index" :title="gym.title" :ImageSRC="baseUrl+gym.logo"/>
    <p v-else>You are not in Gym</p>
    <section v-if="recommended_posts.posts.length > 0">
      <h2>Featured posts  </h2>
      <Swiper
        :slides-per-view="3"
        :space-between="5"
        >
        <SwiperSlide v-for="(post) in postData" :key="post">
          <Thumbnail  :ImageSource="post.media[0].media" :postID="1" :postIndex="1"/> <!-- mozna by se sem hodilo dat jeste id postu at ho muzes pouzivat jako param-->
        </SwiperSlide>
      </Swiper>
    </section>
</template>

<style scoped>


.v-combobox{
  width: auto;
  height: 50px;
  margin: 20px;
}

h2{
  margin: 30px 20px 10px 20px;
  font-weight: bold;
}

p{
  text-align: center;
  margin: auto;
}

.swiper-slide{
  display: flex;
  justify-content: center;
}

section{
  margin: 0  10px;
}

</style>
