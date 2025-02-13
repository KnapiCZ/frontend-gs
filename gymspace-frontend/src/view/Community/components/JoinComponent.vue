<script setup>

import { IonToolbar, IonButtons, IonButton, IonTitle, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { ref } from 'vue';

import apiGym from '@/logic/API/apiGym';




</script>

<template>
    <div class="join-spot-container">
      <div class="button-group">
        <button class="join-button">JOIN</button>
        <button class="spot-button">SPOT</button>
      </div>
      <div class="user-info">
        <div class="joined-by">
          <p>JOINED BY</p>
          <div class="avatars">
            <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar1">
            <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar2">
            <img class="avatar" src="../../../assets/images/gs_logo.png" alt="avatar3">
          </div>
        </div>
        <div class="spotted-by">
          <p>SPOTTED BY</p>
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
    margin-bottom: 10px;
  }
  
  .join-button {
    width: 100px;
    height: 25px;
    background-color: #FFF000;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 900;
    line-height: 17.07px;
    text-align: center;

  }
  
  .spot-button {
    width: 85px;
    height: 25px;
    background-color: transparent;
    color: white;
    border: 1px solid white;
    padding: 9px 20px;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 900;
    line-height: 17.07px;
    text-align: center;

  }
  
  .user-info {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
  }
  
  .joined-by, .spotted-by {
    text-align: left;
    color: white;
    font-size: 12px;
  }
  
  .avatars {
    display: flex;
    justify-content: center;
  }
  
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid white;
    margin-left: -10px;
    margin-right: -8px;
    
  }
</style>
  