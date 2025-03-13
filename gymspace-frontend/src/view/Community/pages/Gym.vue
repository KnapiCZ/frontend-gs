<script setup lang="ts">
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from "@ionic/vue"
import { useRoute } from "vue-router"
import { onMounted, ref } from "vue"
import GymHeaderComponent from "../components/GymHeaderComponent.vue"
import GymJoinComponent from "../components/GymJoinComponent.vue"
import GymLevelComponent from "../components/GymLevelComponent.vue"
import DivisionsComponent from "../components/DivisionsComponent.vue"
import apiGym from "@/logic/API/apiGym"

const route = useRoute()
const gym = ref({
    logo: "",
    level: 0,
    points: 0,
    count_posts: 0,
    count_members: 0,
    count_spotters: 0,
    title: "Loading...",
    background_image: ["", ""],
})

let id = route.params.id as unknown as number
await apiGym("location", 0, undefined)

const loadGym = async () => {
    await apiGym(
        "info",
        id,
        "",
        "title,logo,background_image,count_members,count_spotters,count_posts,level,points,",
    ).then((response) => {
        if ((response.status = "success")) gym.value = response.data
    })
}

onMounted(() => {
    loadGym()
})
</script>

<template>
    <IonPage>
        <IonContent>
            <GymHeaderComponent
                :logo="gym.logo"
                :background_image="gym.background_image"
                :name="gym.title"
                :post-count="gym.count_posts"
                :members="gym.count_members"
                :spotters="gym.count_spotters"
                :id="id"
            />
            <GymLevelComponent
                :level="gym.level"
                :currentXP="gym.points"
                :nextLevelXP="12000"
                :gymPoints="gym.points"
            />
            <GymJoinComponent :gymId="id" />
            <DivisionsComponent />
            <IonSegment mode="md">
                <IonSegmentButton value="posts" content-id="posts">
                    <img class="tab-image" src="../../../assets//new_icons/feed.svg" alt="" />
                </IonSegmentButton>
                <IonSegmentButton value="challenges" content-id="challenges">
                    <img class="tab-image" src="../../../assets//new_icons/challenge.svg" alt="" />
                </IonSegmentButton>
            </IonSegment>
            <IonSegmentView>
                <IonSegmentContent id="posts">HAHAHA</IonSegmentContent>
                <IonSegmentContent id="challenges">HAHAchalalaHA</IonSegmentContent>
            </IonSegmentView>
        </IonContent>
    </IonPage>
</template>
