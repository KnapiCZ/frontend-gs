<script setup>
  import { ref } from 'vue'
  import profile_top from './profile_top.vue';
  import profile_buttons from './profile_buttons.vue';
  import profile_basic_info from './profile_basic_info.vue';

  
  const userId = ref(1)
    const userUrl = `http://127.0.0.1:8000/api/users/${userId.value}`;
    const followingUrl = `http://127.0.0.1:8000/api/following/${userId.value}`


   
        const userResponse = await fetch(userUrl)
        const userData = await userResponse.json()

        const followerResponse = await fetch(followingUrl)
        const followerData = await followerResponse.json()

  //const url = ref("http://127.0.0.1:8000/api/users/"+userId)
  console.log(userData)
  console.log(followerData)

  import Tabbar_main from './tab_bar_pages/tabbar_main.vue';
</script>

<template>
  <div class="page-div"> 

    <profile_top :handle="userData.handle" :followers="followerData.following"/>
    <profile_basic_info :description="userData.description" :email="userData.email"/>

    <profile_buttons />
    <Tabbar_main />
  </div>
</template>


<style scoped>
.page-div{
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>
