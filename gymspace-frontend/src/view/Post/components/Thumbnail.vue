<script setup lang="ts">
import apiUser from '@/logic/API/apiUser';
import { IonButton, useIonRouter } from '@ionic/vue';

const router = useIonRouter()

const props = defineProps({
  ImageSource: String,
  postID: Number,
  postIndex: Number //kde se v seznamu nachazi
})

const baseUrl = await apiUser()
const postUrl = `${baseUrl}${props.ImageSource}`
</script>



<template>
  <IonButton class="ion-no-padding" color="transparent" router-direction="forward"
    @click="() => router.push('/user/1/post/' + postID)">
    <!-- 1source: postURL smaz az po te co smazes :souce/ v router.js 
                                                                                            + na profilu budes chtit ze ti to otevre tenhle post,
                                                                                              ale budes moct scrollovat i mezi dalsimi tvymi posty na profilu
                                                                                              nebo nekde jinde recomended-->
    <img :src="postUrl" alt=""> <!-- API thumbnail of post src-->
  </IonButton>
</template>

<style scoped>
img {
  width: 100%;
  aspect-ratio: 0.5;
  object-fit: cover;
  border-radius: 10px;

}
</style>