<script setup lang="ts">
import { useIonRouter } from '@ionic/vue'
import apiGym from '@/logic/API/apiGym'
import { onMounted, ref } from 'vue'
import background from '@/assets/images/BG.png'

const props = defineProps<{
    id: number
}>()
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
    <div @click="goTo" class="btn row" :style="{ 'background-image': background }">
        <img class="logo-img" :src="gym.logo">
        <div class="text-div">
            <h2>{{ gym.title }}</h2>
            <ul>
                <li>{{ gym.count_not_seen_posts }} New Posts</li>
                <li>{{ gym.count_not_seen_messages }} New Messages</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.btn {
    width: auto;
    height: 90px;
    margin: 8px;
    padding: 0 8px;
    border-radius: 6px;
    border: solid #fff000 1px;
}

.logo-img {
    width: auto;
    height: 60px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid #fff000;
    object-fit: contain;
}

.text-div {
    text-align: left;
}

ul {
    list-style-position: inside;
}
</style>