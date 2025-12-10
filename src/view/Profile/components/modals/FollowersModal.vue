<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonTitle, IonToolbar, modalController } from "@ionic/vue"
import { onMounted, ref } from "vue"

import apiUser from "@/logic/API/apiUser"
import router from "@/router"

import FollowerButton from "../Buttons/FollowerButton.vue"

const renderedUserId = ref(router.currentRoute.value.params.id as unknown as number)

let followers = ref([])
console.log(followers.value)

onMounted(() => {
    apiUser("usersFollowers", renderedUserId.value).then((response) => {
        if (response.status == "success") {
            followers.value = response.data
        }
    })
})
</script>

<template>
  <IonToolbar>
    <template #start>
      <IonButtons>
        <IonButton
          class="back-button"
          @click="modalController.dismiss('followers-modal')"
        >
          <img src="@/assets/icons/arrowRight.svg">
        </IonButton>
      </IonButtons>
    </template>
    <IonTitle>Followers</IonTitle>
  </IonToolbar>
  <IonContent
    id="MainContainer"
    class="ion-no-padding"
  >
    <FollowerButton
      v-for="follower in followers"
      :key="follower"
      :user-id="follower as number"
    />
  </IonContent>
</template>

<style scoped>
#MainContainer {
    position: relative;
    width: 100vw;
    text-align: center;
}

.back-button {
    height: 100%;
    aspect-ratio: 1;
}

.back-button img {
    rotate: 180deg;
}

.top-item,
.top-item1 {
    font-weight: bold;
}

.top-item1 {
    line-height: 22px;
    font-size: 20px;
}

.bottom-item {
    font-size: 12px;
}
</style>
