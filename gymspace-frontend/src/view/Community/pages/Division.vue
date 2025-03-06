<script setup lang="ts">
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/vue'
import { useRoute } from 'vue-router'
import DivisionHeaderComponent from '../components/DivisionHeaderComponent.vue'
import DivisionJoinComponent from '../components/DivisionJoinComponent.vue'
import DivisionLevelComponent from '../components/DivisionLevelComponent.vue'
import apiDivision from '@/logic/API/apiDivision'
import { onMounted, ref } from 'vue'

const route = useRoute()

const division = ref({
    logo: "",
    level: 0,
    points: 0,
    count_posts: 0 | 0,
    count_members: 0,
    count_spotters: 0,
    title: "Loading...",
    background_image: "",
    target_sport: "strongmen"
})

let id = (route.params.id as unknown as number)
const loadDivision = async () => {
    await apiDivision('info', id, '', 'title,logo,background_image,count_members,count_spotters,count_posts,level,points,target_sport,').then((response) => {
        if (response.status = "success") division.value = response.data
    })
}

onMounted(() => {
    loadDivision()
})

</script>

<template>
    <IonPage>
        <IonContent>
            <DivisionHeaderComponent :logo="division.logo" :name="division.title" :post-count="division.count_posts"
                :members="division.count_members" :spotters="division.count_spotters"
                :background_image="division.background_image" :id="id" />
            <DivisionLevelComponent :sport="division.target_sport" :level="division.level" :currentXP="division.points"
                :nextLevelXP="12000" :divisionPoints="division.points" />
            <DivisionJoinComponent :divisionId="id" />
            <IonSegment mode="md">
                <IonSegmentButton value="posts" content-id="posts">
                    <img class="tab-image" src="../../../assets//new_icons/feed.svg" alt="">
                </IonSegmentButton>
                <IonSegmentButton value="challenges" content-id="challenges">
                    <img class="tab-image" src="../../../assets//new_icons/challenge.svg" alt="">
                </IonSegmentButton>
            </IonSegment>
            <IonSegmentView>
                <IonSegmentContent id="posts">HAHAHA</IonSegmentContent>
                <IonSegmentContent id="challenges">HAHAchalalaHA</IonSegmentContent>
            </IonSegmentView>
        </IonContent>
    </IonPage>
</template>

<style scoped>
.v-window {
    padding-top: 10px;
    height: fit-content;
    width: 100%;
    text-align: center;

}

.v-window__container {
    height: 100%;
    width: 100%;

}

.tab-img {
    height: 28px;
}

.btn {
    width: 90%;
    height: 80px;
    margin: 5px auto;
    text-align: center;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
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