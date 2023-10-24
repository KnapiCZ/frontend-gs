<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import ClubGym from '../pages/ClubGym.vue';

const props = defineProps<{
  title?: string,
  ImageSRC?: string,
  id?: number
}>()


</script>

<template>
  <IonButton class="btn ion-no-padding" :id="props.id" color="rgba(255, 255, 255, 0.103)">
    <img :src="props.ImageSRC" alt="">
    <h1>{{ props.title }}</h1>
  </IonButton>
  <ClubGym :modalId="props.id" :name="props.title" :logo="props.ImageSRC" />
</template>

<style scoped>
.btn {
  width: calc(100% - 60px);
  height: 80px;
  margin: 10px 30px 15px 30px;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.103) !important;
}

h1 {
  font-size: 8vw;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 50%;
  left: 120px;
  transform: translateY(-50%);

}

img {
  display: inline;
  width: auto;
  height: 90%;
  aspect-ratio: 1;
  object-fit: contain;
  position: absolute;
  left: 20px;
}
</style>