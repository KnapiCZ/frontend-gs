<script setup>
  import { ref } from 'vue'
  import ProfileTop from './ProfileTop.vue'
  import ProfileButtons from './ProfileButtons.vue';
  import ProfileBasicInfo from './ProfileBasicInfo.vue';

  const baseUrl = `http://10.0.45.50:8080/`
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

  import Tabbar_main from './Tabs/TabBar.vue';
</script>

<template>  
  <div class="page-div"> 
    <ProfileTop :handle="userData.handle" :followers="followData.followers"/>
    <ProfileBasicInfo :description="userData.description" :email="userData.email"/>
    <ProfileButtons />
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
