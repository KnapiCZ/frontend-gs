<script setup lang="ts">
import lodash from 'lodash'
import apiUser from '@/logic/API/apiUser';
import { IonCol } from '@ionic/vue';

const props = defineProps({
  renderedUserId: Number,
})

function checkNull(userObject: unknown) {
  if (lodash.isEmpty(userObject)) {
    return false
  }
  else {
    return userObject
  }
}

const twoMostPopular = await apiUser('twoMostPopular', props.renderedUserId)
let firstUser = checkNull(twoMostPopular[0])
</script>


<template>
  <IonCol>
    <img src="../../../assets/icons/community.svg">
  </IonCol>
</template>

<style scoped>
ion-col {
  width: 100%;
  text-align: center;
}

img {
  width: 20px;
  height: auto;
  aspect-ratio: 1;
  margin-right: 4px;
}

.block {
  margin-bottom: 5px;
  margin-left: 10px;
}
</style>
