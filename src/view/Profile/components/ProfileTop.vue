<script setup lang="ts">
import { modalController } from "@ionic/vue"

import FollowersModal from "./modals/FollowersModal.vue"

const props = defineProps<{
    id: number
    backgroundPicture: string
    profilePicture: string
    countFollowers: number
    countPosts: number
    username: string
    fullName: string
}>()

//const renderedUserId = ref(router.currentRoute.value.params.id as unknown as number)

let isModalOpen = false

const openModal = async () => {
    if (isModalOpen) return

    isModalOpen = true
    const modal = await modalController.create({
        component: FollowersModal,
    })

    await modal.present()

    modal.onDidDismiss().then(() => {
        isModalOpen = false
    })
}

let isUserVerified = 1
</script>

<template>
  <div
    id="background"
    :style="{ backgroundImage: 'url(' + props.backgroundPicture + ')' }"
  >
    <div class="main-info border-gradient">
      <div class="profile-image-container row">
        <div>
          <img
            class="gym-image"
            :src="props.profilePicture"
            alt="Gym Logo"
          >
        </div>
        <div class="center-div">
          <img
            class="profile-image"
            :src="props.profilePicture"
          >
          <img
            v-if="isUserVerified"
            class="verified-icon"
            src="../../../assets/icons/checkMark.svg"
          >
        </div>
        <div>
          <img
            class="division-image"
            :src="props.profilePicture"
          >
          <img
            class="division-image"
            :src="props.profilePicture"
          >
          <img
            class="division-image"
            :src="props.profilePicture"
          >
        </div>
      </div>
      <div class="row">
        <div
          class="column side"
          @click="openModal()"
        >
          <h2>{{ props.countFollowers }}</h2>
          <p>Followers</p>
        </div>
        <div class="column middle">
          <h2>{{ props.fullName }}</h2>
          <p>{{ props.username }}</p>
        </div>
        <div class="column side">
          <h2>{{ props.countPosts }}</h2>
          <p>Posts</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#background {
    position: relative;
    width: 100vw;
    aspect-ratio: 16/9;
    background-position: center;
    background-size: 100vw;
    z-index: 0;
}

.main-info {
    position: absolute;
    width: auto;
    left: 8px;
    right: 8px;
    bottom: -35px;
    height: 70px;
    border-radius: 6px;
    backdrop-filter: blur(6px);
    background-color: rgba(0, 0, 0, 0.315);
}

.row>div {
    align-self: center;
}

.column {
    z-index: 2;
}

.side {
    flex: 1;
}

.middle {
    flex: 2;
}

.row {
    height: 100%;
}

.profile-image-container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 55px;
}

.division-image,
.profile-image,
.gym-image {
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
    width: 60px;
    aspect-ratio: 1;
}

.division-image {
    margin: auto -14px;
    width: 40px;
}

.gym-image {
    border: 2px solid #fff000;
    width: 40px;
}

.center-div {
    position: relative;
}

.verified-icon {
    position: absolute;
    bottom: 0;
    right: 15px;
    width: 15px;
    height: 15px;
    background: yellow;
    border-radius: 50%;
}

.border-gradient::before {
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.46) 19%,
            rgba(255, 255, 255, 0.67) 42%,
            rgba(255, 240, 0, 0.73) 76%,
            rgba(255, 255, 200, 0.48) 100%);
}

.menu-button {
    position: absolute;
    right: 15px;
    top: 10px;
}
</style>
