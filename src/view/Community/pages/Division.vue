<script setup lang="ts">
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonButton } from "@ionic/vue"
import { useRoute } from "vue-router"
import apiDivision from "@/logic/API/apiDivision"
import { onMounted, ref, computed } from "vue"
import PointsComponent from "@/view/shared/components/PointsComponent.vue"
import { updateDivisionColor } from "@/logic/utils/common"

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
    target_sport: "strongmen",
})

let id = route.params.id as unknown as number

// --- DIVISION HEADER STATE ---
const headerExpanded = ref(false)
const headerDescription =
    "We have been here for you since 2014. That's when we opened the largest We have been here for you since 2014. That's when we opened the largest We have been here for you since 2014. That's when we opened the largest..."
const headerTruncatedText = headerDescription.slice(0, 80) + "..."

const toggleHeaderExpand = () => {
    headerExpanded.value = !headerExpanded.value
}

// --- DIVISION JOIN STATE ---
const joined = ref(false)
const spotted = ref(false)

// --- DIVISION LEVEL STATE ---
const progressPercentage = computed(() => (division.value.points / 12000) * 100)

const isSpotting = async () => {
    await apiDivision("spotter-get", id).then((response) => {
        console.log(response)
        if (response.status == "success") spotted.value = response.data
    })
}

const isJoined = async () => {
    await apiDivision("member-get", id).then((response) => {
        console.log(response)
        if (response.status == "success") joined.value = response.data
    })
}

const join = async () => {
    await apiDivision(joined.value ? "member-leave" : "member-join", id).then((response) => {
        if (response.status == "success") joined.value = !joined.value
    })
}

const spot = async () => {
    await apiDivision(spotted.value ? "spotter-leave" : "spotter-join", id).then((response) => {
        if (response.status == "success") spotted.value = !spotted.value
    })
}

const loadDivision = async () => {
    await apiDivision(
        "info",
        id,
        "",
        "title,logo,background_image,count_members,count_spotters,count_posts,level,points,target_sport,",
    ).then((response) => {
        if ((response.status = "success")) division.value = response.data
        updateDivisionColor(division.value.target_sport)
    })
}

onMounted(() => {
    loadDivision()
    isJoined()
    isSpotting()
})
</script>

<template>
    <IonPage>
        <IonContent>
            <!-- DIVISION HEADER COMPONENT (inline) -->
            <div class="header-image-container">
                <img :src="division.background_image" alt="Header Background" class="header-cover-image" />
            </div>

            <div class="header-container border-gradient margin-inline-default">
                <div class="header-top">
                    <div class="header-stats row">
                        <img :src="division.logo" alt="Header Logo" class="header-image" />

                        <div class="default-flex">
                            <h5>{{ division.count_posts }}</h5>
                            <p>posts</p>
                        </div>
                        <div class="default-flex">
                            <h5>{{ division.count_members }}</h5>
                            <p>joined</p>
                        </div>
                        <div class="default-flex">
                            <h5>{{ division.count_spotters }}</h5>
                            <p>spotting</p>
                        </div>
                    </div>

                    <div class="header-bottom">
                        <h4 class="header-title">{{ division.title }}</h4>
                        <p class="header-description smallest-text">
                            <span v-if="!headerExpanded">{{ headerTruncatedText }}</span>
                            <span v-else>{{ headerDescription }}</span>
                            <button @click="toggleHeaderExpand" class="more-button">
                                {{ headerExpanded ? "less" : "more" }}
                            </button>
                        </p>
                        <a href="https://www.newpark.cz" target="_blank" class="header-link row">
                            <img src="/src/assets/icons/link.svg" alt="link" class="header-link-icon" />
                            www.newpark.cz
                        </a>
                    </div>
                </div>
            </div>

            <!-- DIVISION LEVEL COMPONENT (inline) -->
            <div class="level-container row">
                <div class="level-left row">
                    <p class="level-text">LV</p>
                    <div class="level-circle box">
                        <h4>{{ division.level }}</h4>
                    </div>
                    <div class="level-bar">
                        <div class="progress-container">
                            <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
                            <div class="ticks row">
                                <div v-for="(tick, index) in 50" :key="tick" id="tick"
                                    :class="{ long: index % 5 == 0 }"></div>
                            </div>
                        </div>
                        <div class="next-level-text">
                            <span>NXT LV 12000</span>
                        </div>
                    </div>
                </div>

                <PointsComponent :points="division.points" />
            </div>

            <!-- DIVISION JOIN COMPONENT (inline) -->
            <div class="join-spot-container border-gradient column">
                <div class="button-group box">
                    <div class="button-div default-flex">
                        <IonButton v-show="!joined" class="default join-button" @click="join">{{ joined ? "join" :
                            "joined" }}
                        </IonButton>
                    </div>
                    <div class="button-div default-flex">
                        <IonButton v-show="!spotted" class="default spot-button" @click="spot">{{ spotted ? "spot" :
                            "spotted"
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
                            <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar1"
                                style="z-index: 3" />
                            <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar2"
                                style="z-index: 2" />
                            <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar3"
                                style="z-index: 1" />
                        </div>
                    </div>
                    <div class="featured-users row">
                        <div class="text">
                            <p class="smallest-text">SPOTTED BY</p>
                            <p class="smallest-text">janfobl......</p>
                        </div>
                        <div class="avatars box">
                            <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar1"
                                style="z-index: 3" />
                            <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar2"
                                style="z-index: 2" />
                            <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar3"
                                style="z-index: 1" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- SEGMENTS -->
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

<style scoped>
/* ===== DIVISION HEADER COMPONENT STYLES ===== */
.header-image-container {
    position: absolute;
}

.header-cover-image {
    width: 100vw;
    aspect-ratio: 391/180;
    object-fit: cover;
}

.header-container {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    padding: 16px;
    margin-top: 15vh;
    backdrop-filter: blur(20px);
    box-shadow: -4px 4px 19.9px 1px #0000009e;
}

.header-container .border-gradient {
    background: linear-gradient(to bottom,
            rgb(173, 173, 173) 4.06%,
            rgba(170, 170, 170, 0.46) 45.45%,
            rgba(22, 22, 22, 0.13) 100%);
}

.header-image {
    width: 14vw;
    aspect-ratio: 1;
    object-fit: contain;
}

h5 {
    margin-bottom: 4px;
}

.header-stats>div:nth-child(3) {
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.header-stats {
    text-align: center;
    padding: 8px 0;
}

.header-description {
    margin-top: 8px;
}

.more-button {
    color: white;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
}

.header-link {
    justify-content: start;
    gap: 8px;
}

.header-link-icon {
    width: 14px;
    height: 14px;
}

/* ===== DIVISION LEVEL COMPONENT STYLES ===== */
.level-container {
    width: auto;
    margin: 16px;
}

.level-left {
    gap: 10px;
    width: 64%;
}

.level-text {
    margin-bottom: 30px;
    font-size: 10px;
}

.level-container.row {
    justify-content: space-between;
}

.level-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: black;
    box-shadow: 0 0 10px 5px var(--division-color);
    z-index: 10;
}

.level-bar {
    width: 70%;
    margin-left: -16px;
    margin-top: 20px;
}

.progress-container {
    height: 8px;
    background: rgba(0, 0, 0, 1);
    border: 1px solid white;
    border-radius: 2px;
    position: relative;
}

.progress-bar {
    height: 100%;
    background: var(--division-color);
    transition: width 0.5s ease-in-out;
    box-shadow: 0 0 10px 3px var(--division-color);
}

.ticks {
    position: absolute;
    align-items: end;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

#tick {
    width: 1px;
    height: 50%;
    background: white;
    opacity: 0.5;
}

.long {
    height: 70%;
}

.next-level-text {
    font-size: 12px;
    text-align: right;
}

/* ===== DIVISION JOIN COMPONENT STYLES ===== */
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

.tab-image {
    height: 28px;
}

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

.btn {
    width: 90%;
    height: 80px;
    margin: 5px auto;
    text-align: center;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
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
