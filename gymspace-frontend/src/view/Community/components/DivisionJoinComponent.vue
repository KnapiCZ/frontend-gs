<script setup lang="ts">
import { IonToolbar, IonButtons, IonButton, IonTitle, useIonRouter } from '@ionic/vue';
import { watch, onMounted, ref } from "vue";




</script>

<template>
  <div class="join-spot-container">
    <div class="button-group">
      <button class="join-button">JOIN</button>
      <button class="spot-button">SPOT</button>
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

.join-spot-container::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 6px;
  padding: 1px;
  background: linear-gradient(to bottom,
            rgb(173, 173, 173) 4.06%,
            rgba(170, 170, 170, 0.46) 45.45%,
            rgba(22, 22, 22, 0.13) 100%);
  -webkit-mask: linear-gradient(white 0 0) content-box, linear-gradient(white 0 0);
  mask-composite: exclude;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.join-button,
.spot-button {
  width: 38%;
  height: 25px;
  background-color: #FFF000;
  color: black;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 900;
  padding: 0 8%;
  text-align: center;
}

.spot-button {
  width: 24%;
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