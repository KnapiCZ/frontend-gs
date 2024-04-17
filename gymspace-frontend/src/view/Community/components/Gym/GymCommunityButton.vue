<script setup lang="ts">
import { IonButton, useIonRouter } from '@ionic/vue';
import apiGym from '@/logic/API/apiGym';
import apiUser from '@/logic/API/apiUser';

const props = defineProps<{
    id: number
}>()
const router = useIonRouter()
const baseUrl = await apiUser()
let gymInfo = await apiGym("gymInfo", props.id)

</script>

<template>
    <IonButton @click="() => router.push('/gym/' + props.id)" class="btn ion-no-padding"
        color="rgba(255, 255, 255, 0.103)">
        <img class="logo-img" :src="baseUrl + gymInfo.logo" alt="">
        <h2>{{ gymInfo.title }}</h2>
    </IonButton>
</template>

<style scoped>
.btn {
    width: 90%;
    height: 80px;
    margin: 5px auto;
    text-align: center;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1) !important;
}

h2 {
    font-size: clamp(20px, 6vw, 64px);
    font-weight: bold;
    color: white;
    position: absolute;
    top: 50%;
    left: 120px;
    transform: translateY(-50%);
}

.logo-img {
    display: inline;
    width: auto;
    height: 90%;
    aspect-ratio: 1;
    object-fit: contain;
    position: absolute;
    left: 20px;
}
</style>