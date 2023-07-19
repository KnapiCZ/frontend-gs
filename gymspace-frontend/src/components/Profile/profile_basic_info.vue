<script setup>
import profile_following from './profile_following.vue';
import { VRow } from 'vuetify/lib/components/index.mjs';
</script>

<template>
  <VRow class="profile_info">
    <p>I live for my passion to fitness. <br>@gymbeamcz kód: MARTIN5 <br>rmartin.fitness@gmail.com</p>  <!-- API user bio-->
    <profile_following />
  </VRow>
</template>

<style scoped>

.profile_info{
  margin: 20px;
  font-size: 12px;
}

</style>