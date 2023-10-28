<script setup lang="ts">
import ProfileTop from '../components/ProfileTop.vue'
import CurrentUserButton from '../components/Buttons/CurrentUserButton.vue';
import ProfileBasicInfo from '../components/ProfileBasicInfo.vue';
import TabBar from '../components/Tabs/TabBar.vue';
import OtherUserButton from '../components/Buttons/OtherUserButton.vue';
import api from '@/logic/API/apiCaller';

import { IonContent, IonPage } from '@ionic/vue';
import { useStore } from '../../../stores/store';

const store = useStore()

const props = defineProps<{
  id: -1
}>()

await api("userProfile", props.id).then((renderedUser) => {
  sessionStorage.setItem('renderedUser', JSON.stringify(renderedUser)
  )
})

const userData = JSON.parse(
  sessionStorage.getItem('renderedUser')!
)

const loggedInUserId = +sessionStorage.getItem('loggedInUserId')!

store.count = userData.followers


function checkLogin() {
  if (props.id == loggedInUserId) {
    return true;

  } else {
    return false;
  }
}

const baseUrl = await api()
const profile_picture_url = `${baseUrl}${userData.profile_picture}`
const background_picture_url = `${baseUrl}${userData.background_picture}`
//const url = ref("http://127.0.0.1:8000/api/users/"+userId)
</script>

<template>
  <IonPage class="ion-no-padding">
    <IonContent class="ion-no-padding">
      <div class="page-div">
        <ProfileTop :profile_picture_url="profile_picture_url" :background_picture_url="background_picture_url"
          :username="userData.username" :followers="userData.followers" :trainer_status="userData.trainer_status" />

        <ProfileBasicInfo :description="userData.description" :email="userData.email" :rendered-user-id="userData.id" />
        <CurrentUserButton v-if="checkLogin()" :renderedUserId="userData.id" :loggedInUserId="loggedInUserId" />
        <OtherUserButton v-else :renderedUserId="userData.id" :loggedInUserId="loggedInUserId" />
        <TabBar :trainer_status="userData.trainer_status" />
      </div>
    </IonContent>

  </IonPage>
</template>

<style scoped>
.page-div {
  margin: 0;
  padding: 0;
  padding-bottom: 56px;
  text-align: center;
  background-color: black;
}
</style>
