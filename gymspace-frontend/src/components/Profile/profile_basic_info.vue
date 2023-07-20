<script setup>
import profile_following from './profile_following.vue';
import { VRow } from 'vuetify/lib/components/index.mjs';

let props = defineProps({
  description: String,
  email: String,
  followers: Number,
  })

</script>

<template>
  <VRow class="profile_info">
    <p>{{ props.description }}<br>@gymbeamcz kód: MARTIN5 <br>{{ props.email }}</p>  <!-- API user bio-->
    <profile_following />
  </VRow>
</template>

<style scoped>

.profile_info{
  margin: 20px;
  font-size: 12px;
}

</style>
