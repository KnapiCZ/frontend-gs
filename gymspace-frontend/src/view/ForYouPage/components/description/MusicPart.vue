<script setup lang="ts">
import { IonRow } from '@ionic/vue';

const props = defineProps<{
    songname?: string,
}>()


</script>

<template>
    <IonRow>
        <img src="../../../../assets/icons/note.svg" alt="note icon">
        <p>{{ songname }}</p>
    </IonRow>
</template>

<style scoped>
ion-row {
    margin-top: 10px;
    margin-left: calc(8vw + 23px);
    margin-right: 30px;
}

p {
    font-weight: bold;
    color: white;
    font-size: 13px;
}

img {
    margin: auto 10px auto 0;
    height: 13px;
}

.hashtags,
.liked-text {
    margin-top: 3px;
    font-size: 12px;
    color: rgb(153, 153, 153);
}
</style>