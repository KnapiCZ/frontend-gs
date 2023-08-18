<script setup>
  import { VCard } from 'vuetify/lib/components/index.mjs';
  import { VTabs } from 'vuetify/lib/components/index.mjs';
  import { VTab } from 'vuetify/lib/components/index.mjs';
  import { VWindow } from 'vuetify/lib/components/index.mjs';
  import { VWindowItem } from 'vuetify/lib/components/index.mjs';
  
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
      >
        <VTab><img src="../../../assets/icons/feed.png" alt="feed"></VTab>
        <VTab><img src="../../../assets/icons/challenges.png" alt="challenges"></VTab>
        <VTab v-if="trainer_status"><img src="../../../assets/icons/trainer.png" alt="trainer"></VTab>

      </VTabs>
      <VWindow v-model="tab" >
        <VWindowItem>
          feedfeedfeedfeedfeedfeedfeed
        </VWindowItem>        
        <VWindowItem>
            challengeschallengeschallengeschallenges
        </VWindowItem>
        <VWindowItem v-if="isTrainer">
            trainertrainertrainertrainer
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
