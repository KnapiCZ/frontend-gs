<script setup lang="ts">
import { IonButton, IonRow, useIonRouter } from '@ionic/vue';
import apiGym from '@/logic/API/apiGym';
import { onMounted } from 'vue';

const props = defineProps<{
    id: number
}>();
const router = useIonRouter()

let gym = {
    "title": 'ffsefessdfsef',
    "logo": ''
}

const goTo = () => {
    router.push('/gym/' + props.id)
}


onMounted(async () => {
    await apiGym('info', props.id, undefined, 'title,logo').then((response) => {
        if (response.status == "success") gym = response.data
    })
})

</script>

<template>
    <IonRow @click="goTo" class="btn ion-no-padding" color="rgba(255, 255, 255, 0.103)">
        <img class="logo-img" :src="gym.logo">
        <div class="text-div">
            <h2>{{ gym.title }}</h2>
            <ul>
                <li>5 New Posts</li>
                <li>135 New Messages</li>
            </ul>
        </div>
    </IonRow>
</template>

<style scoped>
h2 {
    font-size: clamp(20px, 6vw, 64px);
    font-weight: bold;
    color: white;
}

.btn {
    width: 90%;
    height: 90px;
    margin: 5px auto;
    text-align: center;
    border-radius: 6px;
    border: solid #fff000 1px;
    background-color: rgba(255, 255, 255, 0.1) !important;
}

.logo-img {
    display: inline;
    width: auto;
    height: 60px;
    aspect-ratio: 1;
    object-fit: contain;
    margin: 15px;
}

.text-div {
    margin: 10px;
    text-align: left;
}

ul {
    list-style-position: inside;
}
</style>