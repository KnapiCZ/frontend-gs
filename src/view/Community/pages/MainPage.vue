<script setup lang="ts">
import { IonPage, IonContent, IonSearchbar, IonList, IonItem, modalController } from "@ionic/vue"
import { userDataStore } from "@/stores/UserDataStore"
import { onMounted, ref } from "vue"
import apiGym from "@/logic/API/apiGym"
import apiDivision from "@/logic/API/apiDivision"
import ChallengeModalComponent from "@/view/Challenges/components/ChallengeModalComponent.vue"
import { useIonRouter } from "@ionic/vue"
import background from "@/assets/images/BG.png"
import { updateDivisionColor } from "@/logic/utils/common"

const userStore = userDataStore()
const router = useIonRouter()
const gyms = ref<{ title: string; logo: string; id: number; city: string; address: string }[]>([])
const searchQuery = ref("")
const myGymId = ref(0)
const myDivisions = ref([])

const gym = ref({
    title: "Not found",
    logo: "",
    id: 0,
    city: "",
    address: "",
})

// Inline GymButton logic
const gymButtons = ref<{ [key: number]: { title: string; logo: string; count_not_seen_posts: number; count_not_seen_messages: number } }>({})

const loadGymButton = async (id: number) => {
    await apiGym("getInfo", id, undefined, "title,logo").then((response) => {
        if (response.status == "success") {
            gymButtons.value[id] = response.data
        }
    })
}

// Inline DivisionButton logic
const divisionButtons = ref<{ [key: number]: { title: string; logo: string; sport_name: string; count_not_seen_posts: number; count_not_seen_messages: number } }>({})

const loadDivisionButton = async (id: number) => {
    await apiDivision("getInfo", id, undefined, "title,logo,sport_name").then((response) => {
        if (response.status == "success") {
            divisionButtons.value[id] = response.data
            updateDivisionColor(response.data.sport_name)
        }
    })
}

const goToGym = (id: number) => {
    router.push("/gym/" + id)
}

const goToDivision = (id: number) => {
    router.push("/division/" + id)
}

let isModalOpen = false

const openModal = async () => {
    if (isModalOpen) return

    isModalOpen = true
    const modal = await modalController.create({
        component: ChallengeModalComponent,
        showBackdrop: false,
        componentProps: {
            gym_id: 1,
        },
    })

    await modal.present()

    modal.onDidDismiss().then(() => {
        isModalOpen = false
    })
}

const handleSearch = async () => {
    if (searchQuery.value.length >= 3) {
        await apiGym("search", undefined, undefined, searchQuery.value).then((response) => {
            if (response.status == "success") {
                if (response.data != null) {
                    gyms.value = response.data
                } else {
                    gyms.value = []
                }
            }
        })
    } else {
        gyms.value = []
    }
}

const initializePageData = async () => {
    await apiGym("getUsersGym", 3).then((response) => {
        if (response.status == "success") {
            if (response.data >= 0) {
                console.log(response.data)
                myGymId.value = response.data
                loadGymButton(response.data)
            }
        }
    })
    await apiDivision("getUsersDivisions", 3).then((response) => {
        console.log(response)
        if (response.status == "success") {
            myDivisions.value = response.data
            console.log(myDivisions.value)
            myDivisions.value.forEach(div => loadDivisionButton(div))
        }
    })
}

onMounted(() => {
    initializePageData()
})
</script>
</script>

<template>
    <IonPage class="">
        <IonContent class="top-padding-notch">
            <IonSearchbar mode="md" showCancelButton="never" class="custom border-gradient"
                @update:modelValue="handleSearch" debounce="200" v-model="searchQuery" />
            <IonList v-if="searchQuery.length >= 3 && gyms.length != 0">
                <IonItem v-for="gym in gyms" :key="gym.id" class="gym-bio">
                    <img class="logo" src="../../../assets/images/logo-glow.png" alt="" />
                    <div class="gym-info">
                        <h2>{{ gym.title }}</h2>
                        <p class="bio-text">{{ gym.city }}, {{ gym.address }}</p>
                        <a href="newpark.cz">newpark.cz</a>
                    </div>
                </IonItem>
            </IonList>
            <p class="create-text">
                Can`t find your gym?
                <a href="/create-gym" class="create-link">Create it!</a>
            </p>
            <h4 @click="">
                Your Gyms
                <img v-show="userStore.userGymId.length > 3" id="arrow1" src="../../../assets/icons/arrowRight.svg" />
            </h4>
            <div id="extend1" :key="userStore.componentKey">
                <!-- GymButton inline -->
                <div v-if="myGymId != 0 && gymButtons[myGymId]" @click="goToGym(myGymId)" class="card-btn"
                    :style="{ 'background-image': background }">
                    <img class="card-icon" :src="gymButtons[myGymId].logo" />
                    <div class="text-div">
                        <h2 class="text-ellipsis">{{ gymButtons[myGymId].title }}</h2>
                        <ul>
                            <li>{{ gymButtons[myGymId].count_not_seen_posts }} New Posts</li>
                            <li>{{ gymButtons[myGymId].count_not_seen_messages }} New Messages</li>
                        </ul>
                    </div>
                </div>

                <!-- DivisionButton inline -->
                <div v-for="division in myDivisions" :key="'division' + userStore.componentKey + 2"
                    v-if="divisionButtons[division]" @click="goToDivision(division)" class="card-btn"
                    :style="{ borderColor: 'var(--division-color)', backgroundColor: 'rgba(255, 255, 255, 0.1)' }">
                    <img class="card-icon" :src="divisionButtons[division].logo" />
                    <div class="text-div">
                        <h2 class="text-ellipsis">{{ divisionButtons[division].title }}</h2>
                        <ul>
                            <li>{{ divisionButtons[division].count_not_seen_posts }} New Posts</li>
                            <li>{{ divisionButtons[division].count_not_seen_messages }} New Messages</li>
                        </ul>
                    </div>
                </div>
            </div>
            <p @click="openModal">LOLOLO CHALLLEGNE APMDOAWD</p>
        </IonContent>
    </IonPage>
</template>

<style scoped>
ion-searchbar {
    margin: auto;
}

button {
    text-align: left;
    width: 90%;
    margin: 20px 0 10px 20px;
    font-size: 18px;
    font-weight: bold;
}

ion-searchbar.custom,
ion-searchbar.ios.custom,
ion-searchbar.md.custom {
    font-weight: 800;
    text-align: left;
    width: 97%;
    margin: 10px auto;
    padding: 0;
    box-shadow:
        0 0 10px #fff000,
        inset 0 0 25px 1px #7a7007;
    backdrop-filter: blur(5px);
    min-height: 0;
    border-radius: 6px;
    --background: linear-gradient(90deg,
            rgba(224, 206, 13, 0.35) 0%,
            rgba(175, 173, 150, 0.18) 88%,
            rgb(169, 169, 169, 0.15) 100%);
    --color: #fff;
    --placeholder-color: #fff;
    --icon-color: #fff000;
    --clear-button-color: #fff;
    --border-radius: 6px;
    --cancel-button-color: #19422d;
    --placeholder-font-weight: 700;
    --placeholder-opacity: 1;
}

ion-search.border-gradient::before {
    background: conic-gradient(from 0deg,
            rgba(255, 240, 0, 1) 0%,
            rgba(255, 240, 0, 0.3) 50%,
            rgba(255, 240, 0, 1) 73%,
            rgba(255, 255, 255, 1) 75%,
            rgba(255, 255, 255, 1) 77%,
            rgba(255, 240, 0, 1) 79%);
}

.create-text {
    margin-top: 10px;
    color: white;
    font-weight: 600;
    font-size: 0.85rem;
    text-shadow: rgb(0, 0, 0) 0 0 10px;
}

.create-link {
    color: #fff000;
    font-weight: bold;
    text-decoration: none;
}

.bio-text {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.logo {
    width: 50px;
    margin: 10px;
    aspect-ratio: 1;
    border-radius: 100px;
    border: solid 1px #fff000;
    object-fit: cover;
}

.gym-info {
    width: 100%;
    margin: auto;
}

h2 {
    font-size: 1rem;
}

ion-list {
    margin: auto;
    border-radius: 6px;
    background-color: transparent;
    z-index: 5;
}

ion-item {
    padding: 2px 5px;
    border-radius: 6px;
    --border-radius: 6px;
}

/* Inline card button styles from GymButton & DivisionButton */
.card-btn {
    width: auto;
    height: 90px;
    margin: 8px;
    padding: 0 8px;
    border-radius: 6px;
    border: 1px solid #fff000;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.card-icon {
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

.text-div h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.text-div ul {
    list-style-position: inside;
}
</style>
