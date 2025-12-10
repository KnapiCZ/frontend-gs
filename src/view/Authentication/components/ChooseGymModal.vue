<script lang="ts" setup>
import { IonButton, IonCol, IonContent, IonRow, modalController,useIonRouter } from "@ionic/vue"
import { onMounted, ref } from "vue"

import apiGym from "@/logic/API/apiGym"
import apiUser from "@/logic/API/apiUser"
import { User } from "@/logic/types/user"

const props = defineProps<{
    gymId: number
}>()

const router = useIonRouter()
const error_message = ref("")
const gymData = ref({
    title: "",
    city: "",
    address: "",
    country: "",
    creator: 0,
    count_members: 0,
    count_spotters: 0,
})

const userData: Partial<User> = {
    username: ""
}

const joinGym = async () => {
    await apiGym("member-join", props.gymId).then((response) => {
        if (response.status == "success") {
            modalController.dismiss()
            router.push("/step-6")
        } else {
            error_message.value = response.message
        }
    })
}

const loadGym = async () => {
    await apiGym(
        "info",
        props.gymId,
        undefined,
        "title,city,address,country,creator,count_members,count_spotters,",
    ).then((response) => {
        if (response.status == "success") {
            gymData.value = response.data
        } else {
            error_message.value = response.message
        }
    })
    await apiUser.getProfile(gymData.value.creator, ['username']).then((response) => {
        if (response.status == "success") userData.username = response.data!.username
    })
}

onMounted(async () => {
    loadGym()
})
</script>

<template>
  <ion-content
    :key="props.gymId"
    class="custom ion-padding border-gradient"
  >
    <div class="border-gradient">
      <div class="gym-bio">
        <img
          class="logo"
          src="../../../assets/images/logo-glow.png"
          alt=""
        >
        <div class="gym-info">
          <h2>{{ gymData.title }}</h2>
          <p class="bio-text">
            {{ gymData.country }}, {{ gymData.city }},{{ gymData.address }}
          </p>
          <p>Created by: {{ userData.username }}</p>
        </div>
      </div>
      <IonRow>
        <IonCol>
          <p class="number">
            soon
          </p>
          <p class="small-title">
            posts
          </p>
        </IonCol>
        <IonCol class="middle-col">
          <p class="number">
            {{ gymData.count_members }}
          </p>
          <p class="small-title">
            members
          </p>
        </IonCol>
        <IonCol>
          <p class="number">
            {{ gymData.count_spotters }}
          </p>
          <p class="small-title">
            spoting
          </p>
        </IonCol>
      </IonRow>
      <div class="gym-preview">
        COMING SOON...
      </div>
      <p class="error-message">
        {{ error_message }}
      </p>
      <IonButton
        fill="solid"
        class="sign-up-button"
        @click="joinGym"
      >
        JOIN THIS GYM
      </IonButton>
    </div>
  </ion-content>
</template>

<style scoped>
.border-gradient::before {
    inset: 0;
    background: linear-gradient(190deg,
            rgba(255, 255, 255, 0.59) 0%,
            rgba(255, 240, 0, 0.98) 9%,
            rgba(255, 255, 255, 0.46) 34%,
            rgba(255, 255, 255, 0.69) 65%,
            rgba(255, 240, 0, 0.34) 96%);
}

ion-page,
ion-content.custom {
    text-align: center;
    --ion-background-color: transparent;
    --background: transparent;
    backdrop-filter: blur(20px);
}

.gym-bio {
    display: grid;
    width: 100%;
    grid-template-columns: 25% 75%;
    border-bottom: solid white 1px;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.bio-text {
    font-size: 0.8rem;
}

.logo {
    text-align: center;
    width: 70%;
    margin: auto;
    aspect-ratio: 1;
    border-radius: 50%;
    border: solid 2px #fff000;
    object-fit: cover;
}

.gym-info {
    width: 100%;
    padding: 10px;
    text-align: left;
}

h2 {
    font-size: 1.2rem;
}

.gym-preview {
    width: auto;
    height: 47px;
    margin: 30px 0;
    text-align: center;
    line-height: 2.8rem;
    background-image: url("../../../assets/images/Cover Image.png");
    border-radius: 6px;
    border: solid 1px white;
}

.number {
    font-size: 1rem;
    font-weight: 700;
}

.middle-col {
    border-left: solid white 1px;
    border-right: solid white 1px;
}

.sign-up-button {
    width: 60%;
    margin-top: 20px;
    font-weight: 700;
}
</style>
