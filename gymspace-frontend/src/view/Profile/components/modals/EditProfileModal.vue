<script setup lang="ts">
import { IonToolbar, IonContent, modalController, IonHeader, IonButton, IonButtons, IonTitle, IonList, IonItem, IonInput, IonCol, IonRow, IonTextarea } from '@ionic/vue'
import { ComponentRef } from '@ionic/core'
import { userDataStore } from '@/stores/UserDataStore'
import { onMounted, ref } from 'vue'

import apiUser from '@/logic/API/apiUser'
import FullNameModal from './FullNameModal.vue'
import UsernameModal from './UsernameModal.vue'
import SexModal from './SexModal.vue'
import PronounsModal from './PronounsModal.vue'
import DescriptionModal from './DescriptionModal.vue'

//TODO: udelat dict pro usera kam se zapisou edited veci, to same pro normalniho user, access bude pres funkci, user jen read, edited user read,write

let isModalOpen = false

const userStore = userDataStore()

const user = ref<Record<string, any>>({
    background_picture: '',
    profile_picture: '',
    username: "Loading...",
    full_name: "Loading...",
    description: "Loading...",
    biological_sex: "Loading...",
    height: 0,
    weight: 0,
    contacts: []
})

const save = () => {
    modalController.dismiss({ id: "user-edit" })
}

const openModal = async (modalComponent: ComponentRef, data: string) => {
    if (isModalOpen) return

    isModalOpen = true
    const modal = await modalController.create({
        component: modalComponent,
        componentProps: {
            data: data
        }
    })

    await modal.present()

    modal.onDidDismiss().then(() => {
        isModalOpen = false
    })
}

const loadUser = async () => {
    await apiUser("profile", 3, undefined, "contacts,profile_picture,background_picture,username,description,sex,pronouns,height,weight,").then((response) => {
        if (response.status == "success") {
            user.value = response.data
        }
    })
}

onMounted(() => {
    loadUser()
})
</script>

<template>
    <IonHeader>
        <IonToolbar>
            <IonTitle>Edit Profile</IonTitle>
            <IonButtons slot="end">
                <IonButton class="save-button" :strong="true" @click="save()">Done</IonButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader>
    <IonContent>
        <IonItem class="custom">
            <IonCol>
                <IonRow>
                    <img class="pfp" :src="user.profile_picture">
                    <img class="banner" :src="user.background_picture" alt="">
                </IonRow>
                <ImageModal class="picture" :profile_picture="user.profile_picture"
                    :background_picture="user.background_picture" />
            </IonCol>
        </IonItem>
        <IonInput v-model="user.username" @click="openModal(FullNameModal, 'lololo')" label="Full Name"
            label-placement="fixed" :readonly="true" />
        <IonInput v-model="user.username" @click="openModal(UsernameModal, 'lololo')" label="Username"
            label-placement="fixed" :readonly="true" />
        <IonInput v-model="user.sex" @click="openModal(SexModal, 'lololo')" label="Biological Sex"
            label-placement="fixed" :readonly="true" />
        <IonInput v-model="user.pronouns" @click="openModal(PronounsModal, 'lololo')" label="Pronouns"
            label-placement="fixed" :readonly="true" />
        <IonTextarea v-model="user.description" @click="openModal(DescriptionModal, 'lololo')" label="Description"
            label-placement="fixed" :readonly="true" :auto-grow="true" />
        <IonInput v-model="user.height" @click="openModal(PronounsModal, 'lololo')" label="Height (cm)"
            label-placement="fixed" :readonly="true" />
        <IonInput v-model="user.weight" @click="openModal(PronounsModal, 'lololo')" label="Weight (kg)"
            label-placement="fixed" :readonly="true" />
        <IonInput v-for="(_, index) in user.contacts" v-model="user.contacts[index]" label="Web" aria-readonly="true"
            label-placement="fixed" />
    </IonContent>
</template>

<style scoped>
ion-content {
    --padding-end: 8px;
    --padding-start: 8px;
}

ion-item.custom {
    border-bottom: rgb(53, 53, 53) solid 1px;
}

ion-input::after,
ion-textarea::after {
    content: "";
    background: rgb(53, 53, 53);
    position: absolute;
    bottom: 0;
    left: 100px;
    right: 0;
    width: auto;
    height: 1px;
}

ion-col {
    width: 100%;
    margin: 20px auto;
    text-align: center;
}

ion-avatar {
    margin: auto;
    height: 70px;
    width: 70px;
}


.picture {
    width: 100%;
    text-align: center;
    color: #fff000;
    font-weight: bold;
    font-size: small;
    margin: 20px auto 0 auto;
}

.pfp {
    margin: auto;
    height: 100px;
    width: 100px;
}

.banner {
    margin: auto;
    height: 100px;
    aspect-ratio: 16/9;
}

img {
    object-fit: contain;
}

.save-button {
    --color: #fff000;
}
</style>