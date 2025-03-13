<script setup lang="ts">
import { IonButton, modalController } from "@ionic/vue"
import { ComponentRef } from "@ionic/core"
import EditProfileModal from "../modals/EditProfileModal.vue"

let isModalOpen = false

const openModal = async (modalComponent: ComponentRef) => {
    if (isModalOpen) return

    isModalOpen = true
    const modal = await modalController.create({
        component: modalComponent,
        showBackdrop: false,
    })

    await modal.present()

    modal.onDidDismiss().then(() => {
        isModalOpen = false
    })
}
</script>

<template>
    <div class="border-gradient">
        <div class="buttons-wrapper row">
            <div class="column">
                <IonButton id="user-edit" class="default" @click="openModal(EditProfileModal)">
                    Edit
                </IonButton>
                <p class="followed-by smallest-text">Followed by</p>
                <p class="followers smallest-text">jan_fobl,mekenze,sd...</p>
            </div>
            <div class="row">
                <div class="button-wrapper box border-gradient">
                    <img class="rounded-button" src="../../../../assets/new_icons/chat.svg" alt="" />
                </div>
                <div class="button-wrapper box border-gradient">
                    <img class="rounded-button" src="../../../../assets/new_icons/share.svg" alt="" />
                </div>
                <div class="button-wrapper box border-gradient">
                    <img class="rounded-button" src="../../../../assets/new_icons/options.svg" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.column {
    width: 40%;
    align-items: start;
}

.border-gradient {
    margin: 10px 8px;
    position: relative;
}

.border-gradient::before {
    padding: 1px;
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.46) 19%,
            rgba(255, 255, 255, 0.67) 42%,
            rgba(255, 240, 0, 0.73) 76%,
            rgba(255, 255, 200, 0.48) 100%);
}

.buttons-wrapper {
    width: auto;
    padding: 12px 16px;
    border-radius: 6px;
    background: rgba(41, 40, 29, 0.18);
}

.row {
    gap: 16px;
    width: auto;
}

.column {
    width: 100%;
}

.button-wrapper {
    height: 40px;
    aspect-ratio: 1;
    margin: 0;
    border-radius: 50%;
    background-color: black;
}

.button-wrapper.border-gradient::before {
    border-radius: 50%;
    padding: 1px;
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.53) 8%,
            rgba(255, 255, 255, 0.46) 31%,
            rgba(255, 255, 200, 0.2) 100%);
}

.rounded-button {
    height: 50%;
    aspect-ratio: 1;
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(85deg) brightness(104%) contrast(103%);
}

.followers {
    font-size: 10px;
}

.default {
    width: 100%;
    color: black;
    --background: #fff000;
}

#user-edit {
    margin-bottom: 8px;
}
</style>
