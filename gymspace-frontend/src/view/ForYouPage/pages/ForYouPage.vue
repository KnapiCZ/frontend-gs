<script setup lang="ts">
import { VCard, VTabs, VTab, VWindow, VWindowItem } from 'vuetify/lib/components/index.mjs';
import { IonPage } from '@ionic/vue';

import Slider from '../components/Slider.vue';

</script>

<template>
  <IonPage>
    <VCard>
      <VTabs v-model="tab" color="white" :center-active="true" slider-color="#00000000" bg-color="#00000000"
        align-tabs="center" :grow="true">
        <VTab :value="0" title="Following">Following</VTab>
        <VTab :value="1" title="FOR YOU">FOR YOU</VTab>
        <VTab :value="2" title="CLUB">CLUB</VTab>
      </VTabs>
      <VWindow v-model="tab">
        <VWindowItem>
          <Slider :keyStart="0" :transition="false" :reverse-transition="false" />
        </VWindowItem>
        <VWindowItem>
          <Slider :keyStart="10" :transition="false" :reverse-transition="false" />
        </VWindowItem>
        <VWindowItem>
          <Slider :keyStart="20" :transition="false" :reverse-transition="false" />
        </VWindowItem>
      </VWindow>
    </VCard>
  </IonPage>
</template>


<script lang="ts">
export default {
  data: () => ({
    tab: null
  }),
}
</script>

<style scoped>
.v-window-item--active {
  height: calc(100vh - 52px);
  overflow: hidden;
}

.v-tabs {
  position: absolute !important;
  background-color: transparent;
  color: white;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 5;
}
</style>