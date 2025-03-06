<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Media Test</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
            <IonButton @click="getMedia">Load Media</IonButton>
            <div v-if="mediaList.length">
                <IonImg v-for="(media, index) in mediaList" :key="index" :src="media" />
            </div>
        </IonContent>
    </IonPage>
</template>

<script setup>
import { ref } from 'vue';
import { Media } from '@capacitor-community/media';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg } from '@ionic/vue';

const mediaList = ref([]);

const getMedia = async () => {
    try {
        const result = await Media.getMedias({ quantity: 5 });
        mediaList.value = result.medias.map(media => media.path);
    } catch (error) {
        console.error('Error fetching media:', error);
    }
};
</script>
