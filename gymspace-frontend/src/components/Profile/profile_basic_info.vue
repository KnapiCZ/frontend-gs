<script setup>
import profile_following from './profile_following.vue';

</script>

<template>
  <div class="profile_info">
    <p>I live for my passion to fitness.<br>@gymbeamcz kód: MARTIN5 <br>martin.fitness@gmail.com</p> <!--API user bio-->
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