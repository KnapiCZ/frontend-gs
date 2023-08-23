<script setup>
    import { VCombobox } from 'vuetify/lib/components/index.mjs';
    import GymButton from './GymButton.vue';
    import Thumbnail from '../Post/Thumbnail.vue'
    import { Swiper } from 'swiper/vue'
    import 'swiper/css';
    import api from '@api';

    const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))
    const baseUrl = await api()
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
      class="h-10"
    />
    <h2>Your Gyms</h2>
    <GymButton v-if="gyms != null" v-for="(gym, index) in gyms" :key="index" :title="gym.title" :ImageSRC="gym.ImageSRC"/>
    <p v-else>You are not in Gym</p>
    <section v-if="recommended_posts.posts.length > 0">
      <h2>Featured posts  </h2>
      <swiper-container
        id="thumbnailContainer"
        :slides-per-view="auto"
        >
        <Thumbnail v-for="(post) in postData" :key="post" :ImageSource="post.media[0].media" />
      </swiper-container>
    </section>
</template>

<script>
  export default {
    data: () => ({
        thumbnails: ['id1', 'id2', 'id3', 'id3', 'id3', 'id3'],
        gyms: [  /*  API zatim vratit logo gymu a jeho nazev nebo null pokud v user zadnem neni  */
          {ImageSRC: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNXlxKTKx1BNyefNbP7zji3RNu15aKD6sPAFqJNDUTLpDUSzHyNnQ4L_fraxsAO6mw28&usqp=CAU', title: '0'},
          {ImageSRC: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNXlxKTKx1BNyefNbP7zji3RNu15aKD6sPAFqJNDUTLpDUSzHyNnQ4L_fraxsAO6mw28&usqp=CAU', title: '1'},
          {ImageSRC: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNXlxKTKx1BNyefNbP7zji3RNu15aKD6sPAFqJNDUTLpDUSzHyNnQ4L_fraxsAO6mw28&usqp=CAU', title: '2'},
          {ImageSRC: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNXlxKTKx1BNyefNbP7zji3RNu15aKD6sPAFqJNDUTLpDUSzHyNnQ4L_fraxsAO6mw28&usqp=CAU', title: '3'}
        ]   
      }),
  }
</script>

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


#thumbnailContainer{
  margin: 20px;
  display: flex;                  /* establish flex container */
  overflow-x: scroll;
  align-items: center;
}

</style>
