<script setup lang="ts">
import { ComponentRef } from "@ionic/core"
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonRow,
    IonTextarea,
    IonTitle,
    IonToolbar,
    modalController,
} from "@ionic/vue"
import { computed, onMounted, ref, watch } from "vue"

import apiUser from "@/logic/API/apiUser"
import { userDataStore } from "@/stores/UserDataStore"

import ImageModal from "../DataEditorModals/ImageModal.vue"
import ContactsModal from "./ContactsModal.vue"
import DescriptionModal from "./DescriptionModal.vue"
import FullNameModal from "./FullNameModal.vue"
import HeightModal from "./HeightModal.vue"
import PronounsModal from "./PronounsModal.vue"
import SexModal from "./SexModal.vue"
import UsernameModal from "./UsernameModal.vue"
import WeightModal from "./WeightModal.vue"

//TODO: udelat dict pro usera kam se zapisou edited veci, to same pro normalniho user, access bude pres funkci, user jen read, edited user read,write

let isModalOpen = false

const userStore = userDataStore()

const user = ref<Record<string, any>>({
    background_picture: "",
    profile_picture: "",
    username: "Loading...",
    full_name: "Loading...",
    description: "Loading...",
    biological_sex: "Loading...",
    height: 0,
    weight: 0,
    contacts: [] as unknown[],
})

const sex: { [id: string]: string } = {
    m: "Male",
    f: "Female",
    n: "Rather not to say",
}

const save = () => {
    modalController.dismiss({ id: "user-edit" })
}

const openModal = async (modalComponent: ComponentRef) => {
    if (isModalOpen) return

    isModalOpen = true
    const modal = await modalController.create({
        component: modalComponent,
    })

    await modal.present()

    modal.onDidDismiss().then(() => {
        isModalOpen = false
    })
}

const loadUser = async () => {
    await apiUser(
        "profile",
        3,
        undefined,
        "contacts,profile_picture,background_picture,username,description,sex,pronouns,height,weight,full_name,",
    ).then((response) => {
        if (response.status == "success") {
            user.value = response.data
        }
    })
}

const fullSexName = computed(() => sex[user.value.sex as number] || "Unknown")

watch(userStore.editedUser, (newUser) => {
    if (!newUser) return
    for (const key in newUser) {
        user.value[key] = newUser[key]
    }
})

onMounted(() => {
    loadUser()
})
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Edit Profile</IonTitle>
      <template #end>
        <IonButtons>
          <IonButton
            class="save-button"
            :strong="true"
            @click="save()"
          >
            Done
          </IonButton>
        </IonButtons>
      </template>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <IonItem class="custom">
      <IonCol>
        <IonRow>
          <img
            class="pfp"
            :src="user.profile_picture as string"
          >
          <img
            class="banner"
            :src="user.background_picture as string"
            alt=""
          >
        </IonRow>
        <ImageModal
          class="picture"
          :profile_picture="(user.profile_picture as string)"
          :background_picture="(user.background_picture as string)"
        />
      </IonCol>
    </IonItem>
    <IonInput
      v-model="(user.full_name as string)"
      label="Full Name"
      label-placement="fixed"
      :readonly="true"
      @click="openModal(FullNameModal)"
    />
    <IonInput
      v-model="(user.username as string)"
      label="Username"
      label-placement="fixed"
      :readonly="true"
      @click="openModal(UsernameModal)"
    />
    <IonInput
      v-model="fullSexName"
      label="Biological Sex"
      label-placement="fixed"
      :readonly="true"
      @click="openModal(SexModal)"
    />
    <IonInput
      v-model="(user.pronouns as string)"
      label="Pronouns"
      label-placement="fixed"
      :readonly="true"
      @click="openModal(PronounsModal)"
    />
    <IonTextarea
      v-model="(user.description as string)"
      label="Description"
      label-placement="fixed"
      :readonly="true"
      :auto-grow="true"
      @click="openModal(DescriptionModal)"
    />
    <IonInput
      v-model="(user.height as number)"
      label="Height (cm)"
      label-placement="fixed"
      :readonly="true"
      @click="openModal(HeightModal)"
    />
    <IonInput
      v-model="(user.weight as number)"
      label="Weight (kg)"
      label-placement="fixed"
      :readonly="true"
      @click="openModal(WeightModal)"
    />
    <IonInput
      v-model="(user.contacts.length as number)"
      label="Contact"
      label-placement="fixed"
      :readonly="true"
      @click="openModal(ContactsModal)"
    />
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
