<script lang="ts" setup>
import { IonContent, IonButton, useIonRouter, modalController } from "@ionic/vue"
import { onMounted, ref } from "vue"
import apiGym from "@/logic/API/apiGym"
import apiUser from "@/logic/API/apiUser"
import apiChallenge from "@/logic/API/apiChallenge"
import PreviewComponent from "./PreviewComponent.vue"
import PointsComponent from "@/view/shared/components/PointsComponent.vue"

const props = defineProps<{
    gym_id: number
}>()

const router = useIonRouter()
const error_message = ref("")
const challenge = ref({
    title: "Loading...",
    description: "Loading...",
    created_at: "00-00-0000",
    close_date: "00-00-0000",
    country: "",
    creator: 0,
    points: 0,
    count_spotters: 0,
})

const joinChallenge = async () => {
    await apiGym("member-join", props.gym_id).then((response) => {
        if (response.status == "success") {
            modalController.dismiss()
            router.push("/step-6")
        } else {
            error_message.value = response.message
        }
    })
}

const loadChallenge = async () => {
    await apiChallenge(
        "getChallenge",
        1,
        undefined,
        "title,city,address,country,creator,count_members,count_spotters,",
    ).then((response) => {
        challenge.value = response
    })
    await apiUser("profile", challenge.value.creator, undefined, "username,").then((response) => {
        if (response.status == "success") challenge.value.creator = response.data.username
    })
}

onMounted(async () => {
    loadChallenge()
})
</script>

<template>
    <ion-content :key="props.gym_id">
        <div class="description-box border-gradient">
            <h2 class="title">{{ challenge.title }}</h2>
            <p class="description">{{ challenge.description }}</p>
            <p class="see-more">See full Description</p>
        </div>
        <div class="info-box">
            <div class="row">
                <div class="column">
                    <p class="active-for">Active for:</p>
                    <p class="active-time">
                        {{ challenge.created_at }} -
                        {{ challenge.close_date == null ? "End of Season" : challenge.close_date }}
                    </p>
                </div>
                <PointsComponent :points="challenge.points" />
            </div>
            <div class="row buttons">
                <IonButton class="default">Join challenge</IonButton>
                <div id="buttons" class="row circle-buttons">
                    <img class="icon-button" src="@/assets/icons/Points.svg" alt="" />
                    <img class="icon-button" src="@/assets/icons/Points.svg" alt="" />
                </div>
            </div>
            <div class="row accepted-by">
                <div class="column">
                    <p class="smallest-text">Accepted by</p>
                    <p class="smallest-text">janfobl...asdaw...</p>
                </div>
                <div class="column">
                    <div class="row users">
                        <img class="user-pfp-1" src="@/assets/icons/Points.svg" alt="" />
                        <img class="user-pfp-2" src="@/assets/icons/Points.svg" alt="" />
                        <img class="user-pfp-3" src="@/assets/icons/Points.svg" alt="" />
                    </div>
                </div>
            </div>
            <hr />
        </div>
        <PreviewComponent />
    </ion-content>
</template>

<style scoped>
.description-box {
    width: auto;
    background-color: #282827;
    margin: 16px 8px;
    padding: 16px;
    border-radius: 6px;
}

.info-box {
    width: auto;
    margin: 16px 24px;
}

.title {
    font-size: 20px;
    font-weight: 900;
}

.active-for {
    font-weight: 500;
}

.active-time {
    font-weight: 700;
}

ion-button {
    width: 50%;
    min-height: 24px;
    color: black;
    --background: var(--color-primary-tint);
    --background-hover: #bdb000;
    --background-activated: #bdb000;
    --background-focused: #bdb000;
}

.row.buttons {
    align-items: start;
    margin: 12px auto;
}

.icon-button {
    width: 35px;
    height: 35px;
}

.info-box > .row {
    justify-content: space-between;
}

.row .circle-buttons {
    align-items: end;
    gap: 8px;
}

.row.accepted-by {
    justify-content: start;
    gap: 8px;
}

.row.users img {
    width: 18px;
    height: 18px;
    margin-right: -8px;
}

.user-pfp-1 {
    z-index: 3;
}

.user-pfp-2 {
    z-index: 2;
}

.user-pfp-3 {
    z-index: 1;
}

.column {
    align-items: start;
}

hr {
    height: 1px;
    margin: 16px 0;
    border: none;
    background-color: rgba(88, 88, 88, 1);
}
</style>
