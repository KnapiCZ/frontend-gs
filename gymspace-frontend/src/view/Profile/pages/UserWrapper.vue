<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import GenericUser from './GenericUser.vue';
import router from '@/router';

</script>

<template>
    <IonPage class="ion-no-padding">
        <GenericUser :key="router.currentRoute.value.params.id as unknown as PropertyKey" />
    </IonPage>
</template>
