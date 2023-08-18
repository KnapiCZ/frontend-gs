<script setup>
  import ProfileTop from './ProfileTop.vue'
  import ProfileButtons from './ProfileButtons.vue';
  import ProfileBasicInfo from './ProfileBasicInfo.vue';
  import TabBar from './Tabs/TabBar.vue';
  import api from '@api';

  const loggedInUserId = 2;
  const renderedUserId = 1
  const userData = await api("userProfile", renderedUserId)
  const baseUrl = await api()

  const profile_picture_url = `${baseUrl}${userData.profile_picture}`
  const background_picture_url = `${baseUrl}${userData.background_picture}`
  //const url = ref("http://127.0.0.1:8000/api/users/"+userId)
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
    <ProfileButtons :renderedUserId="userData.id" :loggedInUserId="loggedInUserId"/>
    <TabBar :trainer_status="userData.trainer_status"/>
  </div>
</template>

<style scoped>
.page-div{
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>
