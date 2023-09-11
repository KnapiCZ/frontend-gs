<script setup>
  import ProfileTop from '../components/ProfileTop.vue'
  import OtherUserButton from '../components/Buttons/OtherUserButton.vue'
  import ProfileBasicInfo from '../components/ProfileBasicInfo.vue';
  import TabBar from '../components/Tabs/TabBar.vue';
  import api from '@api';

  const userData = JSON.parse(
                            sessionStorage.getItem('renderedUser')
                            )
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
      :username="userData.username"
      :followers="userData.followers"
      :trainer_status="userData.trainer_status"
    />

    <ProfileBasicInfo
      :description="userData.description"
      :email="userData.email"
      :rendered-user-id="userData.id"
    />
    <OtherUserButton :renderedUserId="userData.id" :loggedInUserId="loggedInUserId"/>
    <TabBar :trainer_status="userData.trainer_status"/>
  </div>
</template>

<style scoped>
.page-div{
  margin: 0;
  padding: 0;
  padding-bottom: 56px;
  text-align: center;
}
</style>
