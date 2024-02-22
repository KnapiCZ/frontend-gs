<script setup lang="ts">
import { IonContent } from '@ionic/vue';
import HeadPart from './description/HeadPart.vue';
import MiddlePart from './description/MiddlePart.vue'
import MusicPart from './description/MusicPart.vue';

const props = defineProps<{
    userHandle?: string,
    description?: string,
    hashtags?: string,
    songname?: string
}>()


</script>


<template>
    <IonContent :scrollY="false" class="description">
        <HeadPart :user-handle="props.userHandle" />
        <MiddlePart :description="props.description" :hashtags="props.hashtags" />
        <MusicPart :songname="props.songname" />
    </IonContent>
</template>

<style scoped>
.description {
    width: 100%;
    height: 150px;
    background-image: linear-gradient(transparent, black);
    position: absolute;
    bottom: 52px;
    left: 0;
    overflow: hidden;
}
</style>