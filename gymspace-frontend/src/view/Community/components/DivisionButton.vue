<script setup lang="ts">
import { IonButton, useIonRouter } from '@ionic/vue';
import apiGym from '@/logic/API/apiGym';

const props = defineProps<{
    id: number
    type: string
    divisionType?: string
}>();
const router = useIonRouter()
let divisionInfo = await apiGym('info', props.id, undefined, 'logo,title')

let goTo = () => {
    router.push('/' + props.type + '/' + props.id)
}

</script>

<template>
    <IonButton @click="goTo" class="btn ion-no-padding" color="rgba(255, 255, 255, 0.103)">
        <img class="logo-img" :src="divisionInfo.logo">
        <h2>{{ divisionInfo.title }}</h2>
    </IonButton>
</template>

<style scoped>
h2 {
    font-size: clamp(20px, 6vw, 64px);
    font-weight: bold;
    color: white;
    position: absolute;
    top: 50%;
    left: 120px;
    transform: translateY(-50%);
}

.btn {
    width: 90%;
    height: 80px;
    margin: 5px auto;
    text-align: center;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1) !important;
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