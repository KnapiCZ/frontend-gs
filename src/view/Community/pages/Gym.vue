<script setup lang="ts">
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonButton } from "@ionic/vue"
import { useRoute } from "vue-router"
import { onMounted, ref, computed } from "vue"
import apiGym from "@/logic/API/apiGym"
import PointsComponent from "@/view/shared/components/PointsComponent.vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import Swiper_ from "swiper"
import Sezona from "@/assets/images/sezona.png"
import viewGymPass from "@/assets/images/BG.png"

const route = useRoute()
let id = route.params.id as unknown as number

// --- GYM HEADER STATE ---
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

const background_swiper = ref<Swiper_ | null>(null)
const headerDescription =
    "We have been here for you since 2014. That's when we opened the largest We have been here for you since 2014. That's when we opened the largest We have been here for you since 2014. That's when we opened the largest..."
const headerExpanded = ref(false)
const headerTruncatedText = headerDescription.slice(0, 80) + "..."

// --- GYM JOIN STATE ---
const joined = ref(false)
const spotted = ref(false)

// --- GYM LEVEL STATE ---
const progressPercentage = computed(() => (gym.value.points / 12000) * 100)

// --- DIVISIONS STATE ---
const divisions = [
    { name: "Bodybuilding", image: "Bodybuilding.png" },
    { name: "Powerlifting", image: "Powerlifting.png" },
    { name: "Calisthenics", image: "Calisthenics.png" },
    { name: "Strongmen", image: "Strongmen.png" },
    { name: "Fighting", image: "Fighting.png" },
    { name: "Crossfit", image: "Crossfit.png" },
]
const swiperRef = ref<Swiper_ | null>(null)

// --- FUNCTIONS ---
const loadGym = async () => {
    await apiGym(
        "getInfo",
        id,
        "",
        "title,logo,background_image,count_members,count_spotters,count_posts,level,points,",
    ).then((response) => {
        if (response.status == "success") gym.value = response.data
    })
}

const toggleHeaderExpand = () => {
    headerExpanded.value = !headerExpanded.value
}

const initializeHeaderSwiper = () => {
    background_swiper.value = new Swiper_(".background-swiper", {
        loop: true,
        autoplay: {
            delay: 10000,
        },
    })
}

const isSpotting = async () => {
    await apiGym("getSpotter", id).then((response) => {
        if (response.status == "success") spotted.value = response.data
    })
}

const isJoined = async () => {
    await apiGym("getMember", id).then((response) => {
        if (response.status == "success") joined.value = response.data
    })
}

const join = async () => {
    await apiGym(joined.value ? "leaveMember" : "joinMember", id).then((response) => {
        if (response.status == "success") joined.value = !joined.value
    })
}

const spot = async () => {
    await apiGym(spotted.value ? "leaveSpotter" : "joinSpotter", id).then((response) => {
        if (response.status == "success") spotted.value = !spotted.value
    })
}

const slidePrev = () => {
    if (swiperRef.value) swiperRef.value.slidePrev()
}

const slideNext = () => {
    if (swiperRef.value) swiperRef.value.slideNext()
}

onMounted(() => {
    loadGym()
    initializeHeaderSwiper()
    isJoined()
    isSpotting()
    apiGym("getLocation", 0, undefined)
})
</script>

<template>
    <IonPage>
        <IonContent>
            <!-- GYM HEADER COMPONENT (inline) -->
            <div class="swiper-container background-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="image in gym.background_image" :key="image">
                        <img :src="image" alt="header Background" class="header-background" />
                    </div>
                </div>
            </div>

            <div class="header-container border-gradient margin-inline-default">
                <div class="header-top">
                    <div class="header-stats row">
                        <img :src="gym.logo" alt="header Logo" class="header-image" />

                        <div class="default-flex">
                            <h5>{{ gym.count_posts }}</h5>
                            <p>posts</p>
                        </div>
                        <div class="default-flex">
                            <h5>{{ gym.count_members }}</h5>
                            <p>joined</p>
                        </div>
                        <div class="default-flex">
                            <h5>{{ gym.count_spotters }}</h5>
                            <p>spotting</p>
                        </div>
                    </div>

                    <div class="header-bottom">
                        <h4 class="header-title">{{ gym.title }}</h4>
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

            <!-- GYM LEVEL COMPONENT (inline) -->
            <div class="level-container row">
                <div class="level-left row">
                    <p class="level-text">LV</p>
                    <div class="level-circle box">
                        <h4>{{ gym.level }}</h4>
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

                <PointsComponent :points="gym.points" />
            </div>

            <!-- GYM JOIN COMPONENT (inline) -->
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

            <!-- DIVISIONS COMPONENT (inline) -->
            <div class="divisions-container">
                <swiper :modules="[Navigation]" :slides-per-view="2" :space-between="0"
                    @swiper="(swiper) => (swiperRef = swiper)" class="swiper-container">
                    <swiper-slide v-for="division in divisions" :key="division.name">
                        <div class="division-card box" @click="$router.navigate('/division/1', 'forward', 'push')">
                            <img :src="'src/assets/images/' + division.image" :alt="division.name"
                                class="division-image" />
                            <div class="overlay border-gradient">
                                <h3>{{ division.name }}</h3>
                                <p class="smallest-text row">
                                    SEE MORE
                                    <span><img src="../../../assets/icons/SwipeArrowRight.svg" /></span>
                                </p>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>

                <div class="row">
                    <button @click="slidePrev" class="nav-button">
                        <img src="../../../assets/icons/SwipeArrowLeft.svg" />
                    </button>
                    <p class="swipe-text">SWIPE FOR MORE DIVISIONS</p>
                    <button @click="slideNext" class="nav-button">
                        <img src="../../../assets/icons/SwipeArrowRight.svg" />
                    </button>
                </div>
            </div>

            <!-- SEASON COMPONENT (inline) -->
            <div class="season-box">
                <div class="games-season">
                    <div class="overlap-group">
                        <img class="view-gym-pass" alt="View gym pass" :src="viewGymPass" />
                        <img class="element-sezona" alt="Element sezona" :src="Sezona" />
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
/* ===== GYM HEADER COMPONENT STYLES ===== */
.swiper-container {
    width: 100vw;
    aspect-ratio: 391/180;
    overflow: hidden;
    position: absolute;
    z-index: 0;
}

.header-background {
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
    border-radius: 50%;
    border: 2px solid #fff000;
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

/* ===== GYM LEVEL COMPONENT STYLES ===== */
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
    box-shadow: 0 0 10px 5px yellow;
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
    background: yellow;
    transition: width 0.5s ease-in-out;
    box-shadow: 0 0 10px 3px yellow;
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

/* ===== GYM JOIN COMPONENT STYLES ===== */
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

/* ===== DIVISIONS COMPONENT STYLES ===== */
.divisions-container {
    width: 100%;
}

.divisions-container .swiper-container {
    width: 100%;
}

.division-card {
    width: 100%;
    height: 140px;
}

.division-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    margin-bottom: 40px;
}

.overlay {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
    box-shadow: -4px 4px 19.9px 1px #0000009e;
    padding: 10px;
    text-align: left;
}

.overlay::before {
    background: linear-gradient(to bottom,
            rgb(173, 173, 173) 4.06%,
            rgba(170, 170, 170, 0.46) 45.45%,
            rgba(22, 22, 22, 0.13) 100%);
}

.overlay img {
    height: 10px;
}

.nav-button {
    font-size: 24px;
    cursor: pointer;
    padding: 0 15px;
    transition: transform 0.2s ease-in-out;
    background: none;
    border: none;
    color: white;
}

.nav-button:hover {
    transform: scale(1.2);
}

.swipe-text {
    opacity: 0.7;
    padding-top: 4px;
}

/* ===== SEASON COMPONENT STYLES ===== */
.season-box {
    position: relative;
    height: 350px;
    width: 414px;
}

.season-box .games-season {
    height: 350px;
    width: 414px;
}

.season-box .overlap-group {
    height: 367px;
    left: -20px;
    position: relative;
    top: -17px;
    width: 434px;
}

.view-gym-pass {
    height: 308px;
    width: 260px;
}

.element-sezona {
    height: 325px;
    width: 418px;
}
</style>
