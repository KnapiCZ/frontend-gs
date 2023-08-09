<script setup>
 import { VCard } from 'vuetify/lib/components/index.mjs';

 const gymInfo = defineProps(['title', 'ImageSRC'])

</script>

<template>
  <VCard>
    <img :src="gymInfo.ImageSRC" alt="">
    <h1>{{ title }}</h1>
  </VCard>
</template>

<style scoped>
.v-card{
    width: auto;
    height: 64px;
    margin: 20px;
    text-align: center;
    background: linear-gradient(45deg, rgb(71, 71, 71), white);
}

h1{
  display: inline;
  font-size: 36px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
img{
  display: inline;
  width: auto;
  height: 100%;
  position: absolute;
  left: 0;
}

</style>