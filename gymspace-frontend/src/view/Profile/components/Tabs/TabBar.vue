<script setup>
  import { VCard } from 'vuetify/lib/components/index.mjs';
  import { VTabs } from 'vuetify/lib/components/index.mjs';
  import { VTab } from 'vuetify/lib/components/index.mjs';
  import { VWindow } from 'vuetify/lib/components/index.mjs';
  import { VWindowItem } from 'vuetify/lib/components/index.mjs';
  import GridLayout from '../../../Post/components/GridLayout.vue';


  let props = defineProps({
    trainer_status: Boolean,
  })
</script>


<template>
  <VCard>
    <VTabs
      v-model="tab"
      color="#e8e20a"
      bg-color="black"
      align-tabs="center"
      slider-color="#CCC400"
      :grow='true'
    >
      <VTab><img src="../../../../assets/icons/feed.svg" alt="feed"></VTab>
      <VTab><img src="../../../../assets/icons/challenges.svg" alt="challenges"></VTab>
      <VTab v-if="trainer_status"><img src="../../../../assets/icons/trainer.svg" alt="trainer"></VTab>

    </VTabs>
    <VWindow v-model="tab" >
      <VWindowItem>
        <GridLayout></GridLayout>
      </VWindowItem>        
      <VWindowItem>
        <GridLayout></GridLayout>
      </VWindowItem>
      <VWindowItem v-if="trainer_status">
        <GridLayout></GridLayout>
      </VWindowItem>
    </VWindow>
  </VCard>
  </template>


  <script>
    export default {
      data: () => ({
        tab: null,
        isTrainer: true
      }),
    }
  </script>

  <style scoped>

.v-card{
  background-color: black;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
