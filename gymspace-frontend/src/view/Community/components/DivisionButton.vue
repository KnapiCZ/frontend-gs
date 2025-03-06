<script setup lang="ts">
import { useIonRouter } from '@ionic/vue'
import apiDivision from '@/logic/API/apiDivision'
import { onMounted, ref } from 'vue'
import { updateDivisionColor } from '@/logic/utils/common'

const props = defineProps<{
    id: number
}>()
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
    <div @click="goTo" class="btn row">
        <img class="logo-img" :src="division.logo">
        <div class="text-div">
            <h2>{{ division.title }}</h2>
            <ul>
                <li>{{ division.count_not_seen_posts }} New Posts</li>
                <li>{{ division.count_not_seen_messages }} New Messages</li>
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
    border-radius: 6px;
    border: solid var(--division-color) 1px;
    background-color: rgba(255, 255, 255, 0.1);
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