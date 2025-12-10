<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import { userDataStore } from "@/stores/UserDataStore"
import apiPost from "@/logic/API/apiPost"
import { IonModal } from "@ionic/vue"
import ChallengeSwipeCard from "../components/ChallengeSwipeCard.vue"

const props = defineProps<{
    row: string
    id: number
    cards: string[]
}>()

let userStore = userDataStore()
//let postIds = await apiPost('recommendedPosts', userStore.loggedUserId)
let challenges = [props.id, 32, 12, 5]
// TODO: api ktera bude vracet challenge a pak doporucene dalsi challenge based on rank a zamereni
// TODO: dat challenge do popup slideru jako u profile cantacts
</script>

<template>
    <div :id="'challenge-modal' + props.row + props.id" class="image-wrapper">
        <img id="challenge-thumbnail" src="../../../assets/images/Bodybuilding.png" alt="" />
    </div>
    <IonModal
        ref="modal"
        :trigger="'challenge-modal' + props.row + props.id"
        :key="'challenge-swipe' + userStore.clickedChallenge"
    >
        <div class="cards">
            <ChallengeSwipeCard
                v-for="(card, index) in cards"
                :key="card"
                :card="card"
                :is-current="index === 0"
                @cardAccepted="$emit('cardAccepted')"
                @cardRejected="$emit('cardRejected')"
                @cardSkipped="$emit('cardSkipped')"
                @hideCard="$emit('hideCard')"
            />
        </div>
    </IonModal>
</template>

<script lang="ts">
export default {
    props: {
        cards: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style scoped>
div.swiper {
    height: 100%;
}

.cards {
    position: relative;
    display: flex;
    margin: 50px;
    width: 300px;
}

ion-modal {
    --height: 70%;
    --width: 90%;
    --border-radius: 20px;
}

ion-modal::part(backdrop) {
    background: rgb(20, 20, 20);
    opacity: 1;
}

ion-modal ion-toolbar {
    --background: rgb(14 116 144);
    --color: white;
}

#challenge-thumbnail {
    width: 95%;
    aspect-ratio: 1;
    border: 2px #fff000 solid;
    border-radius: 20px;
    margin: 2px;
}

#image-wrapper {
    height: 100%;
    width: 100%;
}

.cards {
    margin: 50px;
    width: 90%;
}
</style>
