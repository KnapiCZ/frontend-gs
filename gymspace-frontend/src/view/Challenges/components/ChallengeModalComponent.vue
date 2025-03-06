<script lang="ts" setup>
import { IonContent, IonButton, IonRow, IonCol, useIonRouter, modalController } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import apiGym from '@/logic/API/apiGym'
import apiUser from '@/logic/API/apiUser'
import apiChallenge from '@/logic/API/apiChallenge'
import PreviewComponent from './PreviewComponent.vue'

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
    count_spotters: 0

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
    await apiChallenge("getChallenge", 1, undefined, "title,city,address,country,creator,count_members,count_spotters,").then((response) => {
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
    <ion-content class="ion-padding " :key="props.gym_id">
        <div class="description-box border-gradient">
            <h2 class="title">{{ challenge.title }}</h2>
            <p class="description"> {{ challenge.description }}</p>
            <p class="see-more">See full Description</p>
        </div>
        <div>
            <IonRow>
                <IonCol>
                    <p>Active for:</p>
                    <p class="description">{{ challenge.created_at }} -
                        {{ challenge.close_date == null ? "End ofSeason" : challenge.close_date }}</p>

                </IonCol>

                <div class="gym-points">
                    <span class="points">{{ challenge.points }}</span>
                    <img src="@/assets/icons/Points.svg" alt="Points" class="gym-icon" />
                </div>
            </IonRow>
            <div id="buttons-row" class="flex row">
                <IonButton>Join challenge</IonButton>
                <div id="buttons" class="flex row">
                    <img class="icon-button" src="@/assets/icons/Points.svg" alt="">
                    <img class="icon-button" src="@/assets/icons/Points.svg" alt="">
                </div>
            </div>
            <IonRow>
                <IonCol :offset="2">
                    <p>Accepted by</p>
                    <p>janfobl...asdaw...</p>
                </IonCol>
                <IonCol>
                    <IonRow>
                        <img src="@/assets/icons/Points.svg" alt="">
                        <img src="@/assets/icons/Points.svg" alt="">
                    </IonRow>
                </IonCol>
                <PreviewComponent />
            </IonRow>

        </div>
    </ion-content>
</template>

<style scoped>
.description-box {
    width: auto;
    background-color: #282827;
    padding: 16px;
    border-radius: 6px;
    margin-bottom: 20px;
}

.title {
    font-size: 20px;
    font-weight: 900;
}

.description,
p {
    font-size: 14px;
}

.gym-points {
    width: 96px;
    height: 32px;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    margin: auto;
}

.points {
    font-size: 14px;
    font-weight: bold;
    color: white;
    margin: auto;
}

.gym-icon {
    width: 20px;
    height: 20px;
    margin: auto;
}

ion-button {
    width: 60%;
    min-height: 24px;
    margin: 5px;
    color: black;
    font-size: 14px;
    font-weight: 900;
    border-radius: 6px;
    --border-radius: 6px;
    --background: var(--color-primary-tint);
    --background-hover: #bdb000;
    --background-activated: #bdb000;
    --background-focused: #bdb000;
    --padding-top: 5px;
    --padding-bottom: 5px;
}

#buttons-row {
    width: 100%;
}

#buttons {
    width: 30%;
    justify-content: center;
    align-items: center;
}

.icon-button {
    width: 35px;
    height: 35px;
    margin: 5px;
}

.flex {
    display: flex;
    justify-content: space-between;
}

.row {
    flex-direction: row;
}
</style>