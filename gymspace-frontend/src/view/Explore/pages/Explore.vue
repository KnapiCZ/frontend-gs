<script setup lang="ts">
import { IonLabel, IonPage, IonTabBar, IonTabButton, IonTabs } from '@ionic/vue';
import { IonRouterOutlet } from '@ionic/vue';


</script>

<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>

      <IonTabBar slot="top">
        <IonTabButton tab="foryou" href="/foryou">
          <IonLabel>For You</IonLabel>
        </IonTabButton>

        <IonTabButton tab="challenges" href="/challenges">
          <IonLabel>Challenges</IonLabel>
        </IonTabButton>

        <IonTabButton tab="athletes" href="/athletes">
          <IonLabel>Athletes</IonLabel>
        </IonTabButton>

      </IonTabBar>
    </IonTabs>
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