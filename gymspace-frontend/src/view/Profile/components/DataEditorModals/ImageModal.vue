<script setup lang="ts">
import { IonContent, IonModal } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import ChooseImagesModal from './ChooseImagesModal.vue';

const userStore = userDataStore()

const props = defineProps<{
    profile_picture: string
    background_picture: string
}>()

</script>

<template>
    <div>
        <button id="edit-images" :button="true" :detail="false" lines="full">Edit Pictures</button>
        <IonModal type="modal" trigger="edit-images" :initial-breakpoint="0.6" :breakpoints="[0.6, 1]">
            <h1>Edit pictures</h1>
            <IonContent>
                <ChooseImagesModal name="Banner" :img="background_picture" :ratios="([[16, 9]] as unknown as [])" />
                <ChooseImagesModal name="Profile" :img="profile_picture" :ratios="([[1, 1]] as unknown as [])" />
            </IonContent>
        </IonModal>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    margin: 30px auto 10px auto;
}

ion-content {
    --margin: 10px 0px 10px 10px !important;
    height: fit-content;
    font-size: large;

}
</style>