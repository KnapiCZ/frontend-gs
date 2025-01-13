<script setup lang="ts">
import { useIonRouter, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, IonButton, IonTitle, IonPage, IonTextarea, IonChip } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { ref } from 'vue';
import apiPost from '@/logic/API/apiPost';
import apiGym from '@/logic/API/apiGym';

const userStore = userDataStore()
const router = useIonRouter()
let text = ref()
let names = [] as string[]
let choosen = ref(0)
let choosenName = ref("")

async function addPost() {
    let data = { 'user_id': userStore.loggedUserId, 'description': text.value, 'division': choosen.value, 'media': [userStore.croppedChoosenPhoto], "mentioned_user": [2, 3] }
    await apiPost('createPost', undefined, JSON.stringify(data))
    router.replace('/foryou')
}

for (let i = 0; i < userStore.userDivisionId.length; i++) {
    let data = await await apiGym('info', userStore.userDivisionId[i], undefined, 'title')
    names.push(data.title)
}
</script>


<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton />
                </IonButtons>
                <IonTitle>New Post</IonTitle>
                <IonButtons slot="end">
                    <IonButton class="post-button" @click="addPost()">Post</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
            <img id="choosen-image" :src="userStore.croppedChoosenPhoto">
            <IonTextarea v-model="text" label="Description" placeholder="Write your thoughts here" :counter="true"
                :maxlength="600" :auto-grow="true">
            </IonTextarea>
            <p class="choosen-division">Choosen division: <IonChip v-model="choosenName" id="choosen-chip"
                    v-if="choosen != 0" @click="() => choosen = 0"> {{ choosenName }}
                </IonChip>
            </p>
            <p class="your-divisions">Your divisions</p>
            <IonChip id="chips" v-for="(id, index) in userStore.userDivisionId"
                @click="() => { choosen = id; choosenName = names[index] }">
                {{
                    names[index] }}
            </IonChip>
        </IonContent>
    </IonPage>
</template>

<style scoped>
ion-title {
    margin: 0 20px;
    font-weight: bold;
}

.post-button {
    --color: #fff000;
    font-weight: bold;
}

#choosen-image {
    width: 70%;
    margin: auto;
    object-fit: cover;
}

.choosen-division {
    border-bottom: 1px white solid;
}

.your-divisions {
    margin-top: 10px;

}

#choosen-chip {
    padding: 0 5px;
    margin: 10px;
    --background: #fff000;
    --color: black
}

#chips {
    margin: 10px;
    padding: 0 10px;
    --color: white;
    --background: grey;
    font-weight: bold;

}

ion-content {
    text-align: center;
}

p {
    text-align: left;
    font-weight: bold;
    font-size: 16px;
}
</style>