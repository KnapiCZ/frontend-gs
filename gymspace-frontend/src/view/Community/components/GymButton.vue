<script setup lang="ts">
import { IonButton, IonRow, useIonRouter } from '@ionic/vue';
import apiGym from '@/logic/API/apiGym';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    id: number
}>();
const router = useIonRouter()

const gym = ref({
    title: 'Loading',
    logo: '',
    count_not_seen_posts: 0,
    count_not_seen_messages: 0,

})

const goTo = () => {
    router.push('/gym/' + props.id)
}

onMounted(async () => {
    await apiGym('info', props.id, undefined, 'title,logo,').then((response) => { //implementovat seen posts a pozdeji pak take messages
        if (response.status == "success") gym.value = response.data
    })
})
</script>

<template>
    <IonRow @click="goTo" class="btn ion-no-padding" color="rgba(255, 255, 255, 0.103)">
        <img class="logo-img" :src="gym.logo">
        <div class="text-div">
            <h2>{{ gym.title }}</h2>
            <ul>
                <li>{{ gym.count_not_seen_posts }} New Posts</li>
                <li>{{ gym.count_not_seen_messages }} New Messages</li>
            </ul>
        </div>
    </IonRow>
</template>

<style scoped>
h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    width: calc(100% - 110px);
    margin: 10px;
    text-align: left;
}

ul {
    list-style-position: inside;
}
</style>