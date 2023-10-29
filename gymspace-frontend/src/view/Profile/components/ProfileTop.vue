<script setup lang="ts">
import { VRow, VAvatar } from 'vuetify/lib/components/index.mjs';
import { useStore } from '@/stores/store';

let props = defineProps({
  profile_picture_url: String,
  background_picture_url: String,
  username: String,
  followers: Number,
  trainer_status: Boolean,
})

const store = useStore();

</script>

<template>
  <div id="background" :style="{ backgroundImage: 'url(' + props.background_picture_url + ')' }">
    <div class="main-info " :style="{ backgroundImage: 'url(' + props.background_picture_url + ')' }">
      <img class='PFP' :src="props.profile_picture_url" f><!-- API SCR profiloveho obrazku-->
      <img class="check-mark" src="../../../assets/icons/checkMark.svg"> <!-- API USER VERIFIED-->
      <VRow>
        <div class="column">
          <div class="top-item1">{{ store.count }}</div>
          <div class="bottom-item">followers</div> <!-- API following user count-->
        </div>
        <div class="column">
          <div class="top-item"> {{ props.username }}</div> <!-- API username-->
          <div v-if="props.trainer_status" class="bottom-item">Trainer</div> <!-- API following user count-->
        </div>
        <div class="column">
          <div class="top-item1">25</div>
          <div class="bottom-item">posts</div> <!-- API user post count-->
        </div>
      </VRow>
    </div>
  </div>
</template>

<style scoped>
#background {
  position: relative;
  margin: auto;
  width: 100vw;
  height: 180px;
  text-align: center;
  background-size: 100vw 215px;
  background-position: top;
}

.column {
  width: 30%;
  height: 60px;
  margin: auto;
  padding: 20px 0;

}

.main-info {
  width: 75%;
  height: 70px;
  margin: 0 !important;
  padding-top: 20px;
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  background-position: bottom;
  background-size: 100vw 210px;
  background-blend-mode: darken;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 10px;
}

.PFP {
  width: 80px;
  height: 80px;
  object-fit: contain;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -60px;
}

.v-img__img {
  object-fit: contain !important;
}

.check-mark {
  width: 60px;
  height: 60px;
  position: absolute;
  left: calc((100% / 2));
  top: -20px;
}

.top-item,
.top-item1 {
  font-weight: bold;
}

.bottom-item {
  font-size: 12px;
  font-weight: bold;
}

.top-item1 {
  line-height: 22px;
  font-size: 20px;
}
</style>
