<script setup lang="ts">

import apiGym from '@/logic/API/apiGym';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  gymId: number
}>()

const joined = ref(false)
const spotted = ref(false)

const isSpotting = async () => {
  await apiGym("spotter-get", props.gymId).then((response) => {
    if (response.status == "success") {
      spotted.value = response.data
    }
  })
}

const isJoined = async () => {
  await apiGym("member-get", props.gymId).then((response) => {
    if (response.status == "success") {
      joined.value = response.data
    }
  })
}

const join = async () => {
  await apiGym(joined.value ? 'member-leave' : 'member-join', props.gymId).then((response) => {
    if (response.status == "success") joined.value = !joined.value
  })
}

const spot = async () => {
  await apiGym(spotted.value ? 'spotter-leave' : 'spotter-join', props.gymId).then((response) => {
    if (response.status == "success") spotted.value = !spotted.value
  })
}

onMounted(() => {
  isJoined()
  isSpotting()
  console.log(joined, spotted)
})

//TODO: rozdelit dva buttony do dvou divu aby zachovaly pozici kdyz jeden zmizi

</script>

<template>
  <div class="join-spot-container">
    <div class="button-group">
      <button v-show="spotted" class="join-button" @click="join">{{ joined ? 'JOIN' : "JOINED" }}</button>
      <button v-show="joined" class="spot-button" @click="spot">{{ spotted ? "SPOT" : "SPOTTING" }}</button>
    </div>
    <div class="user-info">
      <div class="joined-by">
        <div class="text">
          <p>JOINED BY</p>
          <p class="user-text">janfobl......</p>
        </div>
        <div class="avatars">
          <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar1" style="z-index: 3;">
          <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar2" style="z-index: 2;">
          <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar3" style="z-index: 1;">
        </div>
      </div>
      <div class="spotted-by">
        <div class="text">
          <p>SPOTTED BY</p>
          <p class="user-text">janfobl......</p>
        </div>
        <div class="avatars">
          <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar1">
          <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar2">
          <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar3">
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.join-spot-container {
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin: 10px 20px;
  margin-top: 15%;
  backdrop-filter: blur(26.6px);
  box-shadow: -4px 4px 19.9px 1px #0000009e;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.join-button,
.spot-button {
  width: 30%;
  height: 25px;
  background-color: #FFF000;
  border: 1px solid #fff000;
  color: black;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 900;
  padding: 0 8%;
}

.spot-button {
  width: 30%;
  height: 25px;
  background-color: transparent;
  color: white;
  border: 1px solid white;
}

.user-info {
  display: flex;
  justify-content: space-between;
  text-align: left;
}

.joined-by,
.spotted-by {
  font-size: 12px;
  width: 38%;
}

.avatars {
  display: flex;
  justify-content: center;
}

.avatar {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid white;
  background-color: #61604f;
  margin-left: -8px;
  margin-right: -4px;
}

.users {
  font-size: 10px;
}
</style>