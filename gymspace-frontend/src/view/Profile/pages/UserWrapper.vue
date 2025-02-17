<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import GenericUser from './GenericUser.vue';
import router from '@/router';
import { ref, watch } from 'vue';

const renderedUserId = ref(router.currentRoute.value.params.id as unknown as number)

watch(() => router.currentRoute.value.params.id, (newId) => {
    renderedUserId.value = (newId as unknown as number)
});

</script>

<template>
    <IonPage class="ion-no-padding">
        <GenericUser :key="renderedUserId" :renderedUser="renderedUserId" />
    </IonPage>
</template>
