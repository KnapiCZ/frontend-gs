<script setup>
  import bottom_navigation_bar from '../bottom_navigation_bar.vue';
  import { VCol } from 'vuetify/lib/components/index.mjs';
  import { VRow } from 'vuetify/lib/components/index.mjs';

  let props = defineProps({
    handle: String,
    followers: Number,
    })

</script>

<template>
  <div class="background">
    <VRow class="main-info">
      <VCol>      
        <div class="top-item">Followers</div> 
        <div class="bottom-item">{{ props.followers }}</div> 
      </VCol>
      <VCol>      
      <div class="top-item"> @{{ props.handle }}</div>
      </VCol>
      <VCol>      
        <div class="top-item">Post</div>  
        <div class="bottom-item">25</div> 
      </VCol>
    </VRow>
    </div>
  <bottom_navigation_bar />
</template>

<style scoped>
.background{
  position: relative;
  margin: auto;
  background-image: url("../../assets/images/background_image.jpg");
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: 150px;
  text-align: center;
}
.main-info{
  position: absolute;
  left: 25%;
  bottom: -20px;
  width: 50%;
  display: inline-grid;
  grid-template-columns: auto auto auto;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.425);
}
</style>
