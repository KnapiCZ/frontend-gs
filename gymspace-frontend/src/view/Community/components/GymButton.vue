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
  background: rgba(145, 145, 145, 0.3)
}

h1{
  font-size: 36px;
  font-style: italic;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}
img{
  display: inline;
  width: auto;
  height: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  position: absolute;
  left: 5px;
}

</style>