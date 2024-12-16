<script setup lang="ts">
import { IonButton, IonCol, IonContent, IonPage, IonToolbar, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { useRoute } from 'vue-router';
import apiUser from '@/logic/API/apiUser';

//Využije se později ve vývoji
const props = defineProps<{
  id: number
}>();

const route = useRoute();
const router = useIonRouter()
const userStore = userDataStore();
const baseUrl = await apiUser();
let id = route.params.id as unknown as number;
let userData = await apiUser("userProfile", id);


let isUserVerified = userData.isUserVerified ?? 1;

</script>


<template>
  <IonPage>
    <IonToolbar>
      <IonButton @click='router.back()' slot="start" class="back-button"><img src="../../../assets/icons/arrowRight.svg"></IonButton>
    </IonToolbar>
    <IonContent class="ion-padding profile-content">

    <div><img class="background" :src="baseUrl + userData.background_picture"></div>
      <IonCard class="profile-card">

        <IonCardContent class="profile-details">

          <div>
            <div class="profile-image-container">
            <img class="profile-image" :src="baseUrl + userData.profile_picture"/>
            <img v-if="isUserVerified" class="verified-icon" src="../../../assets/icons/checkMark.svg"/>
            </div>
          </div>

          <h2 class="profile-name">{{userData.username}}</h2>
          <p class="profile-role">{{userData.handle}}</p>

          <p class="profile-bio">
            {{userData.description}}
          </p>
        </IonCardContent>
      </IonCard>


        <IonGrid class="footer-section">
        <IonRow class="main-info-box-row">
            <IonCol size="12">
            <div class="info-box main-info-box">
                Jméno, profese, odznáčky, divisions
            </div>
            </IonCol>
        </IonRow>

        <IonRow class="two-boxes-row">
            <IonCol size="6">
            <div class="info-box">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            </IonCol>
            <IonCol size="6">
            <div class="info-box">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            </IonCol>
        </IonRow>
        <IonCol class="button-section">
          <IonButton class="contact-button" @click='router.push("/user/"+id+"/trainertab");'>Contact me</IonButton>
        </IonCol>
        </IonGrid>
    </IonContent>
  </IonPage>
</template>

<style scoped>

  .ion-padding {
    --padding-start: 35px;
    --padding-end: 35px;
    --padding-top: 50px;
    --padding-bottom: 35px;
  }

  .back-button {
      height: 100%;
      aspect-ratio: 1;
  }

  .back-button img {
      rotate: 180deg;
  }

  .contact-button {
    --background: yellow;
    padding: 50px;
    color: black;
    font-weight: bold;
    
    
  }

  .button-section {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ion-button {
      --background: transparent;
      --box-shadow: none;
      padding: 10px;
  }

.background {
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    opacity: 0.8;
    z-index: -1;
}


.profile-content {
  color: #fff;
  position: relative;
  text-shadow: 0px 0px 5px black;
}

.profile-card {
  border-radius: 16px;
  overflow: hidden;
  text-align: center;
}

.profile-details {
  padding: 30px;
  text-shadow: 2px 2px 6px black;
}


.profile-image-container {
  margin-top: 60px;
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
}

.profile-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
}

.verified-icon {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background: yellow;
  border-radius: 50%;
  border: 2px solid white;
}


.profile-name {
    font-size: 18px;
    font-weight: bold;
    margin: 8px;
}

.profile-role {
    font-size: 14px;
    margin-bottom: 8px;
}

.profile-bio {
    font-size: 12px;
}

.footer-section {
    margin-top: 16px;
    width: 100%;
}

.main-info-box-row {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.two-boxes-row {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
}

.info-box {
    background: rgba(61, 61, 61, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(65, 65, 65);
    display: flex;
    padding: 16px;
    text-align: left;
    font-size: 12px;
    box-shadow: -15px 10px 5px rgba(0, 0, 0, 0.5);
}

.main-info-box {
    margin-bottom: 40px;
    background: rgba(61, 61, 61, 0.5);

}
</style>