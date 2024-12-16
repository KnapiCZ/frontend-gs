<script setup lang="ts">
import { IonModal, IonToolbar, modalController, IonHeader, IonButton, IonButtons, IonTitle, IonItem, IonTextarea, IonContent, } from '@ionic/vue';
import { ref } from 'vue';
import { userDataStore } from '@/stores/UserDataStore';

const userStore = userDataStore();
let userData = JSON.parse(userStore.editedUser)
let text = ref()
text.value = userData.goal

function cancel() {
    text.value = userData.goal
    modalController.dismiss({ id: "goal-modal" })
}

function save() {
    userData.goal = text.value
    userStore.editedUser = JSON.stringify(userData)
    modalController.dismiss({ id: "goal-modal" })
}

function customFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
}
</script>

<template>
    <IonItem button id="goal-modal">
        <IonTextarea class="outside-textarea" label="Goal" label-placement="fixed" placeholder="Type something here"
            :auto-grow="true" :maxlength="200" :readonly="true" :value="text"></IonTextarea>
    </IonItem>
    <IonModal type="modal" trigger="goal-modal">
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="cancel()">Cancel</IonButton>
                </IonButtons>
                <IonTitle>Goal</IonTitle>
                <IonButtons slot="end">
                    <IonButton class="save-button" :strong="true" @click="save()">Confirm</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonTextarea class="text-input" @ion-change="text = $event.target.value" id="edit" label="Goal"
                placeholder="Type something here" :value="text" :counter="true" :maxlength="200"
                :counter-formatter="customFormatter">
            </IonTextarea>
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

ion-item::part(detail-icon) {
    color: white;
    opacity: 1;
    font-size: 20px;
    position: absolute;
    right: 10px;
}

ion-textarea.outside-textarea::after {
    content: "";
    background: rgb(53, 53, 53);
    position: absolute;
    bottom: 0;
    left: 100px;
    right: 0;
    width: auto;
    height: 1px;
}


.save-button {
    --color: #fff000;
}

.text-input {
    padding: 20px;
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

ion-textarea {
    font-size: 16px;
    line-clamp: 8;
}

</style>