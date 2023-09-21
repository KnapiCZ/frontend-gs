<script setup>
    import { VCombobox } from 'vuetify/lib/components/index.mjs';
    import GymButton from '../components/GymButton.vue';
    import Thumbnail from '../../Post/components/Thumbnail.vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import api from '@api';
    import { ref } from 'vue';

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

    let isActive = ref([true, true])

    async function toggle(value){
      if (isActive.value[value - 1]) {
        isActive.value[value - 1] = false
        document.getElementById("extend" + value).classList.add("active")
        document.getElementById("arrow" + value).style.rotate = "90deg";
      }
      else{
        isActive.value[value - 1] = true
        document.getElementById("extend" + value).classList.remove("active")
        document.getElementById("arrow" + value).style.rotate = "0deg"

      }
    }



</script>

<template>
  <img class="background" src="../../../assets/images/Background.png">
  <VCombobox
    label="Search"
    :items="[]"
    variant='outlined'
  /> <!--   :items vrati to co uzivatel hleda-->

  <button @click="toggle(1)">Your Gyms <img id="arrow1" src="../../../assets/icons/arrowRight.svg"></button>
  
  <div id="extend1">
    <GymButton v-if="gyms != []" v-for="(gym, index) in gyms" :key="index" :title="gym.title" :ImageSRC="baseUrl+gym.logo"/>
    <p v-else>You are not in Gym</p>
  </div>
    
  <button @click="toggle(2)">Your Clubs <img id="arrow2" src="../../../assets/icons/arrowRight.svg"></button>
  
  <div id="extend2">

    <GymButton v-if="gyms != []" v-for="(gym, index) in gyms" :key="index" :title="gym.title" :ImageSRC="baseUrl+gym.logo"/>
    <p v-else>You are not in Gym</p>
  </div>

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
.background{
  position: absolute;
  width: 100vw; height: 100vh;
  object-fit: cover;
  object-position: center;
  z-index: -1;
}

.v-combobox{
  width: auto;
  height: 50px;
  margin: 20px;
}

#extend1,
#extend2{
  width: 100vw;
  height: 100px;
  overflow: hidden;
  -webkit-transition: max-height 1s linear;
    -moz-transition: max-height 1s linear;
    -o-transition: max-height 1s linear;
    transition: amax-height 1s linear;}

#arrow1,
#arrow2{
  margin: 0 10px;
}

.active{
  height: fit-content !important;
}

button{
  width: 200px;
  height: 20px;
  z-index: 100;
  font-size: 18px;
  font-weight: bold;
}

.swiper-slide{
  display: flex;
  justify-content: center;
}

section{
  margin: 0  10px;
}

</style>
