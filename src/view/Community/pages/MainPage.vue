<script setup lang="ts">
import { IonPage, IonContent, IonSearchbar, IonList, IonItem, modalController } from "@ionic/vue"
import { userDataStore } from "@/stores/UserDataStore"
import { onMounted, ref } from "vue"
import GymButton from "../components/GymButton.vue"
import apiGym from "@/logic/API/apiGym"
import apiDivision from "@/logic/API/apiDivision"
import DivisionButton from "../components/DivisionButton.vue"
import ChallengeModalComponent from "@/view/Challenges/components/ChallengeModalComponent.vue"

const userStore = userDataStore()
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
    await apiGym("users-gym", 3).then((response) => {
        if (response.status == "success") {
            if (response.data >= 0) {
                console.log(response.data)
                myGymId.value = response.data
            }
        }
    })
    await apiDivision("users-divisions", 3).then((response) => {
        console.log(response)
        if (response.status == "success") {
            myDivisions.value = response.data
            console.log(myDivisions.value)
        }
    })
}

onMounted(() => {
    initializePageData()
})
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
                <GymButton v-if="myGymId != 0" :id="myGymId" :key="'gym' + userStore.componentKey + 2" />
                <DivisionButton v-if="myDivisions != null" v-for="division in myDivisions" :id="division"
                    :key="'division' + userStore.componentKey + 2" />
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
</style>
