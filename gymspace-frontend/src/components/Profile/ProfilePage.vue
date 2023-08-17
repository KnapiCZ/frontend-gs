<script setup>
  import ProfileTop from './ProfileTop.vue'
  import ProfileButtons from './ProfileButtons.vue';
  import ProfileBasicInfo from './ProfileBasicInfo.vue';
  import api from '../API/apiCaller';
  
  const userData = await api("userProfile", 1)
  const baseUrl = await api()

  const profile_picture_url = `${baseUrl}${userData.profile_picture}`
  const background_picture_url = `${baseUrl}${userData.background_picture}`
  //const url = ref("http://127.0.0.1:8000/api/users/"+userId)
  console.log(userData)

  import Tabbar_main from './Tabs/TabBar.vue';
</script>

<template>  
  <div class="page-div"> 
    <ProfileTop
      :profile_picture_url="profile_picture_url"
      :background_picture_url="background_picture_url"
      :handle="userData.handle"
      :followers="userData.followers"
      :trainer_status="userData.trainer_status"
    />

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
