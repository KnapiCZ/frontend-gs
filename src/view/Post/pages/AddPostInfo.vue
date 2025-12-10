<script setup lang="ts">
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonChip,
    IonContent,
    IonHeader,
    IonPage,
    IonTextarea,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from "@ionic/vue"
import { ref } from "vue"

import apiGym from "@/logic/API/apiGym"
import apiPost from "@/logic/API/apiPost"
import { userDataStore } from "@/stores/UserDataStore"

const userStore = userDataStore()
const router = useIonRouter()
let text = ref()
let names = [] as string[]
let choosen = ref(0)
let choosenName = ref("")

async function addPost() {
    let data = {
        user_id: userStore.loggedUserId,
        description: text.value,
        division: choosen.value,
        media: [userStore.croppedChoosenPhoto],
        mentioned_user: [2, 3],
    }
    await apiPost("createPost", undefined, JSON.stringify(data))
    router.replace("/foryou")
}

for (let i = 0; i < userStore.userDivisionId.length; i++) {
    let data = await await apiGym("info", userStore.userDivisionId[i], undefined, "title")
    names.push(data.title)
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <template #start>
          <IonButtons>
            <IonBackButton />
          </IonButtons>
        </template>
        <IonTitle>New Post</IonTitle>
        <template #end>
          <IonButtons>
            <IonButton
              class="post-button"
              @click="addPost()"
            >
              Post
            </IonButton>
          </IonButtons>
        </template>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <img
        id="choosen-image"
        :src="userStore.croppedChoosenPhoto"
      >
      <IonTextarea
        v-model="text"
        label="Description"
        placeholder="Write your thoughts here"
        :counter="true"
        :maxlength="600"
        :auto-grow="true"
      />
      <p class="choosen-division">
        Choosen division:
        <IonChip
          v-if="choosen != 0"
          id="choosen-chip"
          v-model="choosenName"
          @click="() => (choosen = 0)"
        >
          {{ choosenName }}
        </IonChip>
      </p>
      <p class="your-divisions">
        Your divisions
      </p>
      <IonChip
        v-for="(id, index) in userStore.userDivisionId"
        id="chips"
        :key="id"
        @click="
          () => {
            choosen = id
            choosenName = names[index]
          }
        "
      >
        {{ names[index] }}
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
    --color: black;
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
