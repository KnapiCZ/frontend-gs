<script setup>
  import { VCol } from 'vuetify/lib/components/index.mjs';
  import { VRow } from 'vuetify/lib/components/index.mjs';
  import { VAvatar } from 'vuetify/lib/components/index.mjs';

  let props = defineProps({
    profile_picture_url: String,
    background_picture_url: String,
    username: String,
    followers: Number,
    trainer_status: Boolean,
    })

</script>

<template>
  <div id="background" :style="{ backgroundImage: 'url(' + props.background_picture_url + ')'}">
    <VCol class="main-info " :style="{ backgroundImage: 'url(' + props.background_picture_url + ')'}">
    <VAvatar class='PFP' :image="props.profile_picture_url"></VAvatar> <!-- API SCR profiloveho obrazku-->
      <VRow>
        <VCol>      
          <div class="top-item">Followers</div> 
          <div class="bottom-item">{{ props.followers }}</div> <!-- API following user count-->
        </VCol>
        <VCol>      
          <div class="top-item"> {{ props.username }}</div> <!-- API username-->
          <div v-if="props.trainer_status" class="bottom-item">Trainer</div> <!-- API following user count-->

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
#background{
  position: relative;
  margin: auto;
  width: 100vw;
  height: 150px;
  text-align: center;
  background-size: 100vw 185px;
  background-position: top;
}

.main-info{  
  width: 75%;
  height: 70px;
  margin: auto;
  padding-top: 20px;
  position: absolute;
  bottom: -35px;
  left: calc((100% / 2) - (75% / 2));
  background-position: bottom;
  background-size: 100vw 180px;
  background-blend-mode: darken;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 10px;
}
.PFP{
  width: 80px; height: 80px;
  position: absolute;
  left: calc((100% / 2) - 40px);
  top: -60px;
}

.top-item{
  font-weight: bold;
}
</style>
