<script lang="ts" setup>
import { IonContent, IonButton, IonRow, IonCol, useIonRouter, modalController } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import apiGym from '@/logic/API/apiGym';
import apiUser from '@/logic/API/apiUser';
const props = defineProps<{
    gym_id: number
}>()

const router = useIonRouter()
const error_message = ref("")
const gymData = ref({
    title: "",
    city: "",
    address: "",
    country: "",
    creator: 0,
    creatorUsername: "",
    count_members: 0
})

let user_id = localStorage.getItem("logged_user_id")

const joinGym = async () => {
    await apiGym("join", props.gym_id, undefined, undefined, user_id?.toString()).then((response) => {
        if (response.status = "success") {
            modalController.dismiss()
            router.push("/step-6")
        } else {
            error_message.value = response.message
        }
    })
}

onMounted(async () => {
    try {
        gymData.value = await apiGym("info", props.gym_id, undefined, "title,city,address,country,creator,count_members");
        console.log(gymData.value.creator)

        let creator = await apiUser("profile", gymData.value.creator, undefined, "username,")
        console.log(creator)
        gymData.value.creatorUsername = creator.username
    } catch (error) {
        error_message.value = "Something went wrong."
    }
});

</script>

<template>
    <ion-content class="ion-padding" :scroll-y="false" :key="props.gym_id">
        <div class="gym-bio">
            <img class="logo" src="../../../assets/images/logo-glow.png" alt="">
            <div class="gym-info">
                <h2>{{ gymData.title }}</h2>
                <p class="bio-text">{{ gymData.country }}, {{ gymData.city }},{{ gymData.address }}</p>
                <p>Created by: {{ gymData.creatorUsername }}</p>
            </div>
        </div>
        <IonRow>
            <IonCol>
                <p class="number">soon</p>
                <p class="small-title">posts</p>
            </IonCol>
            <IonCol class="middle-niggle">
                <p class="number">{{ gymData.count_members }}</p>
                <p class="small-title">members</p>
            </IonCol>
            <IonCol>
                <p class="number">soon</p>
                <p class="small-title">spoting</p>
            </IonCol>
        </IonRow>
        <div class="gym-preview">
            COMING SOON...
        </div>
        <p class="error-message">{{ error_message }}</p>
        <IonButton fill="solid" class="sign-up-button" @click="joinGym">JOIN THIS GYM</IonButton>
    </ion-content>
</template>

<style scoped>
ion-content {
    text-align: center;
}

.gym-bio {
    display: grid;
    width: 94%;
    grid-template-columns: 25% 75%;
    margin: 0 3%;
    border-bottom: solid white 1px;
    margin-bottom: 10px;
}

.bio-text {
    font-size: 12px;
}

.logo {
    text-align: center;
    width: 90%;
    margin: auto;
    aspect-ratio: 1/1 !important;
    border-radius: 100px;
    border: solid 2px #fff000;
    object-fit: cover;
    object-position: center;
    display: inline-block;
}

.gym-info {
    width: 100%;
    margin: auto;
    padding: 10px;
    text-align: left;
    display: inline-block;
}


h2 {
    font-size: 1.2rem;
}

.gym-preview {
    width: 87%;
    text-align: center;
    line-height: 47px;
    background-image: url("../../../assets/images/Cover Image.png");
    height: 47px;
    margin: 10px auto;
    border-radius: 6px;
}

.number {
    font-size: 18px;
    font-weight: 700;
}

.middle-niggle {
    border-left: solid white 1px;
    border-right: solid white 1px;
}
</style>
