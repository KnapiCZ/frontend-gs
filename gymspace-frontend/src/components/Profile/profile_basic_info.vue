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
  <div class="profile_info">
    <p>{{ props.description }}<br>@gymbeamcz kód: MARTIN5 <br>{{ props.email }}</p> <!--API user bio-->
    <profile_following />
  </div>
</template>

<style scoped>

.profile_info{
  text-align: left;
  margin: 40px 20px 20px 20px;
  display: grid;
  grid-template-columns: 70% 30%;
  font-size: 12px;
}

</style>
