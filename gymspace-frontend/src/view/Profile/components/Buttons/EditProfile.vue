<script setup lang="ts">
import { IonModal, IonToolbar, modalController, IonHeader, IonButton, IonButtons, IonTitle, IonList, IonItem, IonInput, IonTextarea, IonCol, IonAvatar } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { ref } from 'vue';

import apiUser from '@/logic/API/apiUser';
import BioModal from '@/view/Profile/components/DataEditorModals/BioModal.vue'
import GoalModal from '../DataEditorModals/GoalModal.vue';
import PronounsModal from '../DataEditorModals/PronounsModal.vue';
import SexModal from '../DataEditorModals/SexModal.vue';

const userStore = userDataStore()
const baseUrl = await apiUser()
const forceRerender = () => {
    userStore.componentKey += 1;
};

userStore.editedUser = userStore.user

let userData = JSON.parse(userStore.editedUser)
let data = ref({
    username: userData.username,
    handle: userData.handle,
})

function cancel() {
    modalController.dismiss({ id: "user-edit" })
}

async function save() {
    userStore.user = userStore.editedUser
    userData = JSON.parse(userStore.user)
    userData.handle = data.value.handle
    userData.username = data.value.username
    userStore.user = JSON.stringify(userData)
    console.log(await apiUser('update'))
    forceRerender()
    modalController.dismiss("user-edit")
}

</script>

<template>
    <button id="user-edit">
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
        <div class="edit-images">
            <img><img>
        </div>
        <IonList>
            <IonItem class="custom">
                <IonCol>
                    <IonAvatar>
                        <img alt="pfp" :src="baseUrl + userData.profile_picture" />
                    </IonAvatar>
                    <p class="picture">Edit picture</p>
                </IonCol>
            </IonItem>
            <IonItem>
                <IonInput v-model="data.handle" label="Handle" label-placement="fixed" placeholder="Unique for every user"
                    :value="data.handle">
                </IonInput>
            </IonItem>

            <IonItem>
                <IonInput v-model="data.username" label="Username" label-placement="fixed" placeholder="Your Username"
                    :value="data.username">
                </IonInput>
            </IonItem>
            <GoalModal />
            <BioModal />
            <PronounsModal />
            <SexModal />

            <IonItem>
                <IonInput label="Height" label-placement="fixed" placeholder="Your Height" :readonly="true"
                    :value="userData.height + ' cm'">
                </IonInput>
            </IonItem>

            <IonItem>
                <IonInput label="Weight" label-placement="fixed" placeholder="Your Weight" :readonly="true"
                    :value="userData.weight + ' kg'">
                </IonInput>
            </IonItem>
        </IonList>
    </IonModal>
</template>

<style scoped>
ion-title {
    text-align: center;
}

ion-button {
    --color: white;
}

ion-list {
    height: 100%;
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
    margin: auto;
}

img {
    object-fit: contain;
}


.save-button {
    --color: #fff000;
}

#user-edit {
    width: 32%;
    height: 30px;
    margin: auto;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border-radius: 5px;
    background-color: rgb(47, 47, 47);
}
</style>