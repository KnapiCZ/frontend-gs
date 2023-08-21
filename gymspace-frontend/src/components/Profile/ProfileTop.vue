<script setup>
  import { VCol } from 'vuetify/lib/components/index.mjs';
  import { VRow } from 'vuetify/lib/components/index.mjs';
  import { VAvatar } from 'vuetify/lib/components/index.mjs';

  let props = defineProps({
    profile_picture_url: String,
    background_picture_url: String,
    handle: String,
    followers: Number,
    trainer_status: Boolean,
    })
</script>

<template>
  <div class="background">
    <img style="position: relative;width: 100vw;height: 150px;" :src="props.background_picture_url">
    <VCol class="main-info">
    <VAvatar class='PFP' :image="props.profile_picture_url"></VAvatar> <!-- API SCR profiloveho obrazku-->
      <VRow>
        <VCol>      
          <div class="top-item">Followers</div> 
          <div class="bottom-item">{{ props.followers }}</div> <!-- API following user count-->
        </VCol>
        <VCol>      
          <div class="top-item"> @{{ props.handle }}</div> <!-- API username-->
          <div v-if="props.trainer_status" class="bottom-item">trainer</div> <!-- API following user count-->

        </VCol>
        <VCol>      
          <div class="top-item">Post</div>  
          <div class="bottom-item">25</div> <!-- API user post count-->
        </VCol>
      </VRow>
    </VCol>
  </div>
</template>

<style scoped>
.background{
  position: relative;
  margin: auto;
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: 150px;
  text-align: center;
}
.main-info{  
  width: 75%;
  height: 70px;
  margin: auto;
  padding-top: 20px;
  position: absolute;
  bottom: -35px;
  left: calc((100% / 2) - (75% / 2));
  background-color: rgba(0, 0, 0, 0.603);
  color: white;
  border-radius: 10px;
}
.PFP{
  width: 80px; height: 80px;
  position: absolute;
  left: calc((100% / 2) - 40px);
  top: -60px;
}

.bottom-item{
  font-size: 14px;
  color: rgb(207, 205, 205)
}
</style>
