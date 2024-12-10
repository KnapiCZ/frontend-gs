<script setup lang="ts">
import { IonModal, IonToolbar, IonContent, modalController, IonHeader, IonButton, IonButtons, IonTitle, IonList, IonItem, IonInput, IonCol, IonRow } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { ref } from 'vue';

import apiUser from '@/logic/API/apiUser';
import BioModal from '@/view/Profile/components/DataEditorModals/BioModal.vue'
import GoalModal from '../DataEditorModals/GoalModal.vue';
import PronounsModal from '../DataEditorModals/PronounsModal.vue';
import SexModal from '../DataEditorModals/SexModal.vue';
import ImageModal from '../DataEditorModals/ImageModal.vue';

const userStore = userDataStore()
const forceRerender = () => {
    userStore.componentKey += 1;
};

userStore.editedUser = userStore.user

let userData = JSON.parse(userStore.editedUser)
let data = ref({
    username: userData.username,
    handle: userData.handle,
    height: userData.height,
    weight: userData.weight
})

userStore.profilePicture = userData.profile_picture
userStore.backgroundPicture = userData.background_picture


function cancel() {
    modalController.dismiss({ id: "user-edit" })
}

//TODO: zkontrolovat tuto funkci, prizpusobit aktualnimu api, handle nepujde updatovat
async function save() {
    let contactsUrls = ""
    for (let i = 0; i < 5; i++) { contactsUrls += contacts[i] + "\r\n" }
    userStore.user = userStore.editedUser
    userData = JSON.parse(userStore.user)
    userData.handle = data.value.handle
    userData.username = data.value.username
    userData.contacts = contactsUrls
    userData.height = data.value.height as unknown as number
    userData.weight = data.value.weight as unknown as number
    userStore.user = JSON.stringify(userData)
    console.log(await apiUser('update')) // upravit tento userapi
    forceRerender()
    modalController.dismiss("user-edit")
}

let contacts = userData.contacts.split("\r\n")

</script>

<template>
    <button id="user-edit" class="profile-button">
        Edit profile
    </button>
    <IonModal type="modal" trigger="user-edit">
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton color="white" @click="cancel()">Cancel</IonButton>
                </IonButtons>
                <IonTitle>Edit Profile</IonTitle>
                <IonButtons slot="end">
                    <IonButton class="save-button" :strong="true" @click="save()">Save</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div class="edit-images">
                <img><img>
            </div>
            <IonList>
                <IonItem class="custom">
                    <IonCol>
                        <IonRow>
                            <img class="pfp" :src="userStore.profilePicture" />
                            <img class="banner" :src="userStore.backgroundPicture" alt="">
                        </IonRow>
                        <ImageModal class="picture" />
                    </IonCol>
                </IonItem>
                <IonItem>
                    <IonInput v-model="data.handle" label="Handle" label-placement="fixed"
                        placeholder="Unique for every user" :value="data.handle">
                    </IonInput>
                </IonItem>

                <IonItem>
                    <IonInput v-model="data.username" label="Username" label-placement="fixed"
                        placeholder="Your Username" :value="data.username">
                    </IonInput>
                </IonItem>
                <GoalModal />
                <BioModal />
                <PronounsModal />
                <SexModal />
                <IonItem>
                    <IonInput v-model="data.height" label="Height (cm)" label-placement="fixed"
                        placeholder="Your Height" :value="data.height">
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonInput v-model="data.weight" label="Weight (kg)" label-placement="fixed"
                        placeholder="Your Weight" :value="data.weight">
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonInput v-model="contacts[0]" label="Web" label-placement="fixed" placeholder="Your web"
                        :value="contacts[0]">
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonInput v-model="contacts[1]" label="Tel" label-placement="fixed" placeholder="Your mobile number"
                        :value="contacts[1]">
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonInput v-model="contacts[2]" label="Email" label-placement="fixed" placeholder="Your email"
                        :value="contacts[2]">
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonInput v-model="contacts[3]" label="Instagram" label-placement="fixed"
                        placeholder="Your Instagram" :value="contacts[3]">
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonInput v-model="contacts[4]" label="YouTube" label-placement="fixed" placeholder="Your Youtube"
                        :value="contacts[4]">
                    </IonInput>
                </IonItem>
            </IonList>
        </IonContent>
    </IonModal>
</template>

<style scoped>
ion-title {
    text-align: center;
}

ion-button {
    --color: white;
}

ion-item {
    --inner-border-width: 0;
}

ion-item.custom {
    border-bottom: rgb(53, 53, 53) solid 1px;
}

ion-item::part(detail-icon) {
    color: white;
    opacity: 1;
    font-size: 20px;
    position: absolute;
    right: 15px;
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

ion-modal {
    --ion-background-color: #0E0E0E;
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