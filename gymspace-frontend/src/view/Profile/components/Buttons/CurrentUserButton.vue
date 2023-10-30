<script setup lang="ts">

import { IonRow } from '@ionic/vue';
import ContactButton from './ContactButton.vue';

</script>


<template>
  <IonRow>
    <button class="profileButtons">
      Edit
    </button>

    <button class="profileButtons">
      Share
    </button>
    <ContactButton class="profileButtons"></ContactButton>

  </IonRow>
</template>
  
  
<style scoped>
ion-row {
  margin-top: 10px;
  width: 100vw;
}

.profileButtons {
  width: 30%;
  height: 30px;
  padding: 5px auto;
  margin: 10px auto;
  text-align: center;
  background-color: rgb(47, 47, 47);
  font-weight: bold;
  border-radius: 10px;
}
</style>


