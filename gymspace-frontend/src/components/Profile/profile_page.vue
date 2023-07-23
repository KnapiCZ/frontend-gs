<script setup>
  import { ref } from 'vue'
  import profile_top from './profile_top.vue';
  import profile_buttons from './profile_buttons.vue';
  import profile_basic_info from './profile_basic_info.vue';

  const baseUrl = `http://10.0.0.10:8000/`
  const userId = ref(1)
  const userUrl = `${baseUrl}/api/users/${userId.value}`;
  const followUrl = `${baseUrl}/api/users/follow/${userId.value}`


   
  const userResponse = await fetch(userUrl)
  const userData = await userResponse.json()

  const followResponse = await fetch(followUrl)
  const followData = await followResponse.json()

  //const url = ref("http://127.0.0.1:8000/api/users/"+userId)
  console.log(userData)
  console.log(followData)

  import Tabbar_main from './tab_bar_pages/tabbar_main.vue';
</script>

<template>  
  <div class="page-div"> 
    <profile_top :handle="userData.handle" :followers="followData.followers"/>
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
