<script setup lang="ts">
import { IonButton, IonRow, useIonRouter } from '@ionic/vue';
import apiDivision from '@/logic/API/apiDivision';
import { onMounted, ref } from 'vue';
import { updateDivisionColor } from '@/logic/utils/common';

const props = defineProps<{
    id: number
}>();
const router = useIonRouter()

const division = ref({
    title: 'Loading',
    logo: '',
    sport_name: '',
    count_not_seen_posts: 0,
    count_not_seen_messages: 0,

})

const goTo = () => {
    router.push('/division/' + props.id)
}

onMounted(async () => {
    await apiDivision('info', props.id, undefined, 'title,logo,sport_name,').then((response) => { //implementovat seen posts a pozdeji pak take messages
        if (response.status == "success") division.value = response.data
    })

    updateDivisionColor(division.value.sport_name)
})
</script>

<template>
    <IonRow @click="goTo" class="btn ion-no-padding" color="rgba(255, 255, 255, 0.103)">
        <img class="logo-img" :src="division.logo">
        <div class="text-div">
            <h2>{{ division.title }}</h2>
            <ul>
                <li>{{ division.count_not_seen_posts }} New Posts</li>
                <li>{{ division.count_not_seen_messages }} New Messages</li>
            </ul>
        </div>
    </IonRow>
</template>

<style scoped>
h2 {
    width: auto;
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
    border: solid var(--division-color) 1px;
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