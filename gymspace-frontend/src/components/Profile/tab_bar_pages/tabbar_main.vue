<script setup>
  import { VCard } from 'vuetify/lib/components/index.mjs';
  import { VTabs } from 'vuetify/lib/components/index.mjs';
  import { VTab } from 'vuetify/lib/components/index.mjs';
  import { VWindow } from 'vuetify/lib/components/index.mjs';
  import { VWindowItem } from 'vuetify/lib/components/index.mjs';
  import { VContainer } from 'vuetify/lib/components/index.mjs';
  
</script>


<template>
    <VCard>
      <VTabs
        v-model="tab"
        color="deep-purple-accent-4"
        bg-color="black"
        align-tabs="center"
      >
        <VTab :value="feed"><img src="../../../assets/icons/feed.png" alt="feed"></VTab>
        <VTab :value="challenges"><img src="../../../assets/icons/challenges.png" alt="challenges"></VTab>
        <VTab :value="trainer"><img src="../../../assets/icons/trainer.png" alt="trainer"></VTab>

      </VTabs>
      <VWindow v-model="tab" >
        <VWindowItem
          :key="feed"
          :value="feed"
        >
          <VContainer fluid>
            feedfeedfeedfeedfeedfeedfeed
          </VContainer>
        </VWindowItem>        
        <VWindowItem
          :key="challenges"
          :value="challenges"
        >
          <VContainer fluid>
            challengeschallengeschallengeschallenges
          </VContainer>
        </VWindowItem>
        <VWindowItem
          :key="trainer"
          :value="trainer"
        >
          <VContainer fluid>
            trainertrainertrainertrainer
          </VContainer>
        </VWindowItem>
      </VWindow>
    </VCard>
  </template>


  <script>
    export default {
      data: () => ({
        tab: null,
      }),
    }
  </script>