<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonPage, IonTitle, IonToolbar, useIonRouter } from "@ionic/vue"
import { useRoute } from "vue-router"

import apiPost from "@/logic/API/apiPost"
import { userDataStore } from "@/stores/UserDataStore"

import BorderedPost from "../components/PostContainers/BorderedPost.vue"

const router = useIonRouter()
const route = useRoute()

let userStore = userDataStore()
let init = route.params.initialPosition as unknown as number
let id = route.params.id as unknown as number

let post = await apiPost("usersPosts", id)
userStore.userPostsKey = []

function scrollToPost() {
    if (document.getElementById("postCard" + init)) {
        var ele = document.getElementById("postCard" + init)
        ele?.scrollIntoView()
    } else {
        setTimeout(scrollToPost, 10)
    }
}

function addPostKey() {
    userStore.userPostsKey.push(0)
    return "post"
}

scrollToPost()
</script>

<template>
  <IonPage class="ion-no-padding">
    <IonToolbar>
      <template #start>
        <IonButtons>
          <IonButton
            class="back-button"
            @click="router.back()"
          >
            <img src="@/assets/icons/arrowRight.svg">
          </IonButton>
        </IonButtons>
      </template>
      <IonTitle>Posts</IonTitle>
    </IonToolbar>
    <IonContent
      id="MainContainer"
      class="ion-no-padding"
    >
      <BorderedPost
        v-for="(data, index) in post"
        :key="addPostKey() + data + userStore.userPostsKey[index]"
        :post-id="data as unknown as number"
        :index="index"
      />
    </IonContent>
  </IonPage>
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
</style>
