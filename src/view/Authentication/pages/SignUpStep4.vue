<script setup lang="ts">
import { IonContent, IonPage } from "@ionic/vue"

import apiSport from "@/logic/API/apiSport"

import SportBox from "../components/SportBox.vue"

let sports = await apiSport("allSports")
sports = sports.data
</script>

<template>
  <IonPage>
    <IonContent
      class="sign-up-content top-padding-notch"
      :scroll-y="false"
    >
      <h1 class="sign-up">
        Choose your sports
      </h1>

      <div class="grid-container">
        <SportBox
          v-for="sport in sports"
          :key="sport.id"
          :title="sport.title"
          :description="sport.description"
          :image-src="sport.sport_image"
          :sport-id="sport.id"
        />
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 42%);
    grid-template-rows: repeat(3, 16vh);
    justify-content: center;
    align-items: center;
    gap: 10px;
    box-sizing: border-box;
}

.grid-container > * {
    position: relative;
}
</style>
