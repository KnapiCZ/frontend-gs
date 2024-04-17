<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import GenericUser from './GenericUser.vue';
import { userDataStore } from '@/stores/UserDataStore';

const userStore = userDataStore()

</script>

<template>
    <IonPage class="ion-no-padding">
        <GenericUser :key="userStore.componentKey" />
    </IonPage>
</template>
