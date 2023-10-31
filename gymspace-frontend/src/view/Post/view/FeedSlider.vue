<script setup lang="ts">
import json from '../../../assets/mocs/profilepost.json'
import apiUser from '@/logic/API/apiUser';
import FeedPost from '../components/Feed/FeedPost.vue';
import { IonPage, IonContent } from '@ionic/vue';

const baseUrl = await apiUser()
</script>

<template>
    <IonPage class="ion-no-padding">
        <IonContent class="ion-no-padding" id="MainContainer">
            <FeedPost v-for="object in myJson" :image="baseUrl + object.thumbSRC" :description="object.description"
                :date="object.date" :userhandle="object.userhandle" :username="object.username" />
        </IonContent>
    </IonPage>
</template>



<script lang="ts">
export default {
    data: () => ({
        myJson: json,
    }),
}

</script>

<style scoped>
#MainContainer {
    position: relative;
    width: 100vw;
    background-color: black;
    text-align: center;


}
</style>