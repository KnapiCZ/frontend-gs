<script setup lang="ts">
import { IonPage, IonRouterOutlet, IonTabBar, IonTabButton,IonTabs } from "@ionic/vue"
import { onMounted, ref } from "vue"

import apiUser from "@/logic/API/apiUser"

const user_id = localStorage.getItem("logged_user_id") as unknown as number
const profile_picture = ref<string>()

onMounted(async () => {
    await apiUser.getProfile(user_id,["profile_picture"]).then(async (response) => {
        if (response.status == "success" && response.data) profile_picture.value = response.data.profile_picture
    })
})
</script>

<script lang="ts">
export default {
    data: () => ({ value: 2 }),
}
</script>

<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet />
      <template #bottom>
        <IonTabBar>
          <IonTabButton
            tab="user"
            class="no-filter"
            :href="'/user/' + user_id"
          >
            <img
              id="profile"
              class="no-filter"
              :src="profile_picture"
            >
          </IonTabButton>

          <IonTabButton
            tab="community"
            href="/community/"
          >
            <img
              class="colored"
              src="../../../assets/new_icons/Gym.svg"
              alt=""
            >
          </IonTabButton>

          <IonTabButton
            tab="postadd"
            href="/addPost"
          >
            <img
              src="../../../assets/icons/plusbutton.svg"
              alt=""
            >
          </IonTabButton>

          <IonTabButton
            tab="games"
            href="/games/"
          >
            <img
              class="colored"
              src="../../../assets/new_icons/Games.svg"
              alt=""
            >
          </IonTabButton>

          <IonTabButton
            tab="forYou"
            href="/explore/"
          >
            <img
              class="colored"
              src="../../../assets/new_icons/Search.svg"
              alt=""
            >
          </IonTabButton>
        </IonTabBar>
      </template>
    </IonTabs>
  </IonPage>
</template>

<style scoped>
img {
    height: 60%;
    aspect-ratio: 1;
}

.colored {
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(85deg) brightness(104%) contrast(103%);
}

ion-tab-bar {
    --background: black;
    padding-bottom: env(safe-area-inset-bottom);
}

.tab-selected {
    filter: brightness(0) saturate(100%) invert(84%) sepia(22%) saturate(3283%) hue-rotate(4deg) brightness(112%) contrast(103%);
    background-color: transparent;
}

.no-filter {
    filter: none;
}

#profile {
    object-fit: contain;
    border-radius: 50%;
    border: 2px solid transparent;
}

.tab-selected #profile {
    border: 2px solid #fff000;
}
</style>
