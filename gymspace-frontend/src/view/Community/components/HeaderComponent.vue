<script setup lang="ts">
import { IonToolbar, IonButtons, IonButton, IonTitle, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { ref } from 'vue';

import BioButton from './BioButton.vue';
import apiGym from '@/logic/API/apiGym';

const props = defineProps<{
    id: number
    type: string
    logo?: string
    name?: string
}>()

const router = useIonRouter()
const userStore = userDataStore()
const index1 = userStore.userDivisionId.indexOf(props.id)
const index2 = userStore.userGymId.indexOf(props.id)
let info = await apiGym('info', props.id, undefined, '')
//let FollowMembers = ref([0, info!.members.length]);
//let isJoined = ref(checkJoined());
let isFollowing = false

const description = "We have been here for you since 2014. That's when we opened the largest...";
const expanded = ref(false);

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

const truncatedText = description.slice(0, 50) + "...";

function close() {
    router.back()
    if (userStore.remove) {
        if (props.type == 'division') userStore.userDivisionId.splice(index1, 1)
        else userStore.userGymId.splice(index2, 1)
        userStore.remove = false
    }
}

//function checkJoined() {
//    if (info!.members.includes(userStore.loggedUserId as never)) return true;
//    else return false;
//}

// async function Join() {
//     if (true) {
//         FollowMembers.value[1] -= 1;
//         userStore.remove = true
//     } else {
//         FollowMembers.value[1] += 1;
//         if (!userStore.userDivisionId.includes(props.id) && props.type == 'division') userStore.userDivisionId.push(props.id)
//         if (!userStore.userDivisionId.includes(props.id)) userStore.userGymId.push(props.id)
//     }
//     await apiGym("join", info!.id, undefined, undefined, userStore.loggedUserId.toString());
//     isJoined.value = !isJoined.value;
// }

</script>

<template>

  <div class="header-image-container">
    <img
      src="/src/assets/images/Cover Image.png"
      alt="Gym Background"
      class="header-image"
    />
  </div>


  <div class="header-container">
    <div class="gym-left">
      <img
        src="/src/assets/images/gs_logo.png"
        alt="Gym Logo"
        class="gym-image"
      />
      <h2 class="gym-title">NEW PARK</h2>
      <a href="https://www.newpark.cz" target="_blank" class="gym-link">
        <img
        src="/src/assets/icons/link.svg"
        alt="link"
        class="gym-link-icon"
      /> www.newpark.cz
      </a>
    </div>

    <div class="gym-right">
      
      <div class="gym-stats">
        <div class="gym-posts">
          <h2>5435</h2>
          <p>posts</p>
        </div>
        <div class="gym-joined">
          <h2>421</h2>
          <p>joined</p>
        </div>
        <div class="gym-spotters">
          <h2>1000</h2>
          <p>spotting</p>
        </div>
      </div>
      <p class="gym-description">
        <span v-if="!expanded">{{ truncatedText }}</span>
        <span v-else>{{ description }}</span>
        <button @click="toggleExpand" class="more-button">
          {{ expanded ? "less" : "more" }}
        </button>
      </p>
    </div>
  </div>
</template>

<style scoped>

ion-title {
    font-weight: bold;
}

.grid-container {
    display: grid;
    width: 100%;
    grid-template-columns: 50% 25% 25%;
    margin: 0;
}

#background {
    position: relative;
    margin: auto;
    width: 100vw;
    height: 200px;
    max-height: 200px;
    text-align: center;
    background-color: #0E0E0E;
}

.follow,
.join {
    width: 95%;
    height: fit-content;
    border-radius: 8px;
    color: black;
    font-weight: bold;
}

.follow {
    border: 2px solid #FFF000;
    background-color: #FFF000;
    transition: background-color 0.5s ease-in-out;
    transition: color 0.5s ease-in-out;
}

.following {
    background-color: transparent;
    color: #FFF000;
}

.join {
    border: 2px solid white;
    background-color: white;
    transition: background-color 0.5s ease-in-out;
    transition: color 0.5s ease-in-out;
}

.joined {
    background-color: transparent;
    color: white;
}

.back-button {
    height: 100%;
    aspect-ratio: 1;
}

.back-button img {
    rotate: 180deg;
}

.top {
    font-weight: bold;
    font-size: 24px;
}

.bottom {
    margin-bottom: 10px;
}

.column {
    margin-top: auto;
    margin-bottom: 20px;
}

.header-image-container {
  position: absolute;
}

.header-container {
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin: 0 20px;
  margin-top: 15%;
  backdrop-filter: blur(26.6px);
  box-shadow: -4px 4px 19.9px 1px #0000009e;
  
}

.gym-left {
  flex: 1;
}

.gym-image {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #FFF000 !important;
  object-fit: cover;
  margin-bottom: 8px;
}


.gym-title {
  font-size: 16px;
  font-weight: 900;
  line-height: 18.29px;
}


.gym-right {
  flex: 2;
  color: #fff;
}

.gym-stats {
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 8px;
  gap: 2px;
  color: #fff;
}

.gym-stats > div {
  flex: 1;
}

.gym-stats h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

.gym-stats p {
  font-size: 14px;
  font-weight: normal;
  color: #fff;
}

.gym-stats > div:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding-right: 16px;
}

.gym-stats > div:not(:first-child) {
  padding-left: 16px;
}

.gym-description {
  margin: 8px;
  font-size: 12px;
  color: #ccc;
}

.more-button {
  cursor: pointer;
}

.header-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.header-text {
  margin-top: 16px;
  justify-content: left;
}

.header-title {
  font-weight: bold;
}
.header-stats {
  display: flex;
  justify-content: right;
  color: #fff;
  margin-bottom: 16px;
}
.header-description {
  margin-top: 8px;
}
.more-button {
  color: white;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.gym-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #FFF000;
  text-decoration: none;
  font-weight: bold;
  font-size: 12px;
}

.gym-link-icon {
  height: 16px;
}
</style>
