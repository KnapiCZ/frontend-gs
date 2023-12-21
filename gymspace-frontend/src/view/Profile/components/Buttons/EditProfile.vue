<script setup lang="ts">
import { IonModal, IonToolbar, modalController, IonHeader, IonButton, IonButtons, IonTitle, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonCol, IonAvatar } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';

import apiUser from '@/logic/API/apiUser';

const userStore = userDataStore()

let baseUrl = await apiUser()
let userData = await apiUser("userProfile", userStore.loggedUserId)

console.log(userData)
function cancel() {
    modalController.dismiss({ id: "user-edit" })
}
let sexVar = userData.sex as string

let sex: { [id: string]: string } = {
    "M": "Male",
    "F": "Female",
    "O": "Other",
    "N": "Rather not to say",
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
                    <IonButton class="save-button" :strong="true" @click="cancel()">Confirm</IonButton>
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
                <IonInput label="Handle" label-placement="fixed" placeholder="Unique for every user"
                    :value="userData.handle">
                </IonInput>
            </IonItem>

            <IonItem>
                <IonInput label="Username" label-placement="fixed" placeholder="Your Username" :value="userData.username">
                </IonInput>
            </IonItem>

            <IonItem>
                <IonTextarea label="Bio" label-placement="fixed" placeholder="Type something here" :maxlength="200"
                    :value="userData.description"></IonTextarea>
            </IonItem>

            <IonItem :button="true">
                <IonInput label="Pronouns" label-placement="fixed" placeholder="Your Pronouns" :readonly="true"
                    value="He/Him"></IonInput>
            </IonItem>

            <IonItem :button="true">
                <IonInput label="Gender" label-placement="fixed" placeholder="Your Gender" :readonly="true"
                    :value="sex[sexVar]">
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
    width: 30%;
    height: 30px;
    padding: 5px auto;
    margin: 10px auto;
    text-align: center;
    background-color: rgb(47, 47, 47);
    font-weight: bold;
    border-radius: 10px;
}
</style>