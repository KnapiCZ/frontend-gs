<script setup lang="ts">
import { IonContent, IonToolbar, IonButtons, IonButton, IonTitle, modalController } from "@ionic/vue"
import { onMounted, ref } from "vue"
import FollowerButton from "../Buttons/FollowerButton.vue"
import apiUser from "@/logic/API/apiUser"
import router from "@/router"

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
        <IonButtons slot="start">
            <IonButton @click="modalController.dismiss('followers-modal')" class="back-button">
                <img src="@/assets/icons/arrowRight.svg" />
            </IonButton>
        </IonButtons>
        <IonTitle>Followers</IonTitle>
    </IonToolbar>
    <IonContent class="ion-no-padding" id="MainContainer">
        <FollowerButton v-for="follower in followers" :userId="follower as number" />
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
