<script setup lang="ts">
import { IonButton } from "@ionic/vue"
import { onMounted, ref } from "vue"
import apiGym from "@/logic/API/apiGym"

const props = defineProps<{
    gymId: number
}>()

const joined = ref(false)
const spotted = ref(false)

const isSpotting = async () => {
    console.log(joined.value, spotted.value)

    await apiGym("spotter-get", props.gymId).then((response) => {
        if (response.status == "success") spotted.value = response.data
    })
}

const isJoined = async () => {
    console.log(joined.value, spotted.value)

    await apiGym("member-get", props.gymId).then((response) => {
        if (response.status == "success") joined.value = response.data
    })
}

const join = async () => {
    console.log(joined.value, spotted.value)

    await apiGym(joined.value ? "member-leave" : "member-join", props.gymId).then((response) => {
        if (response.status == "success") joined.value = !joined.value
    })
}

const spot = async () => {
    console.log(joined.value, spotted.value)

    await apiGym(spotted.value ? "spotter-leave" : "spotter-join", props.gymId).then((response) => {
        if (response.status == "success") spotted.value = !spotted.value
    })
}

onMounted(() => {
    isJoined()
    isSpotting()
    console.log(joined.value, spotted.value)
})
</script>

<template>
    <div class="join-spot-container border-gradient column">
        <div class="button-group box">
            <div class="button-div default-flex">
                <IonButton v-show="!joined" class="default join-button" @click="join">{{ joined ? "join" : "joined" }}
                </IonButton>
            </div>
            <div class="button-div default-flex">
                <IonButton v-show="!spotted" class="default spot-button" @click="spot">{{ spotted ? "spot" : "spotted"
                }}
                </IonButton>
            </div>
        </div>
        <div class="user-info box">
            <div class="featured-users row">
                <div class="text">
                    <p class="smallest-text">JOINED BY</p>
                    <p class="smallest-text">janfobl......</p>
                </div>
                <div class="avatars box">
                    <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar1" style="z-index: 3" />
                    <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar2" style="z-index: 2" />
                    <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar3" style="z-index: 1" />
                </div>
            </div>
            <div class="featured-users row">
                <div class="text">
                    <p class="smallest-text">SPOTTED BY</p>
                    <p class="smallest-text">janfobl......</p>
                </div>
                <div class="avatars box">
                    <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar1" style="z-index: 3" />
                    <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar2" style="z-index: 2" />
                    <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar3" style="z-index: 1" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.join-spot-container {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    padding: 8px;
    margin: 16px 8px;
    backdrop-filter: blur(26.6px);
    box-shadow: -4px 4px 19.9px 1px #0000009e;
}

.join-spot-container .border-gradient {
    background: linear-gradient(to bottom,
            rgb(173, 173, 173) 4.06%,
            rgba(170, 170, 170, 0.46) 45.45%,
            rgba(22, 22, 22, 0.13) 100%);
}

.button-group {
    width: 100%;
}

.join-button,
.spot-button {
    width: 90%;
    color: black;
    margin-bottom: 8px;
    --border-color: #fff000;
    --background: #fff000;
    --background-hover: #a39302;
    --background-activated: #a39302;
}

.spot-button {
    color: white;
    --border-color: #fff;
    --background-hover: #ffffff33;
    --background-activated: #ffffff33;
    --background: transparent;
}

.user-info {
    width: 100%;
}

.featured-users {
    width: 90%;
    padding: 0 8px;
}

.avatar {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid white;
    background-color: #61604f;
    margin-left: -8px;
    margin-right: -4px;
}

.row {
    justify-content: start;
    gap: 16px;
}
</style>
