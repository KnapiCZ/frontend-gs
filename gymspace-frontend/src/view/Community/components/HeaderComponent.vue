<script setup lang="ts">
import { useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { ref } from 'vue';

const props = defineProps<{
  id: number
  type: string
  logo?: string
  name?: string
  postCount?: number | 0
  spotters?: number | 0
  members?: number | 0
}>()

const router = useIonRouter()

const description = "We have been here for you since 2014. That's when we opened the largest We have been here for you since 2014. That's when we opened the largest We have been here for you since 2014. That's when we opened the largest...";
const expanded = ref(false);

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

const truncatedText = description.slice(0, 80) + "...";

</script>

<template>

  <div class="header-image-container">
    <img src="/src/assets/images/Cover Image.png" alt="Gym Background" class="header-image" />
  </div>

  <div class="header-container">
    <div class="gym-top">
      <div class="gym-stats">
        <img :src="logo" alt="Gym Logo" class="gym-image" />

        <div class="gym-posts">
          <h2>{{ postCount }}</h2>
          <p>posts</p>
        </div>
        <div class="gym-joined">
          <h2>{{ members }}</h2>
          <p>joined</p>
        </div>
        <div class="gym-spotters">
          <h2>{{ spotters }}</h2>
          <p>spotting</p>
        </div>
      </div>

      <div class="gym-bottom">
        <h2 class="gym-title">{{ name }}</h2>
        <p class="gym-description">
          <span v-if="!expanded">{{ truncatedText }}</span>
          <span v-else>{{ description }}</span>
          <button @click="toggleExpand" class="more-button">
            {{ expanded ? "less" : "more" }}
          </button>
        </p>
        <a href="https://www.newpark.cz" target="_blank" class="gym-link">
          <img src="/src/assets/icons/link.svg" alt="link" class="gym-link-icon" /> www.newpark.cz
        </a>


      </div>
    </div>
  </div>
</template>

<style scoped>
.header-image-container {
  position: absolute;
}

.header-image {
  width: 100vw;
  aspect-ratio: 391/180;
  object-fit: cover;
}

.header-container {
  box-sizing: border-box;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 16px;
  margin: 0 20px;
  margin-top: 15vh;
  backdrop-filter: blur(20px);
  box-shadow: -4px 4px 19.9px 1px #0000009e;
}

.gym-bottom {
  text-align: left;
}

.gym-image {
  width: 14vw;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid #FFF000 !important;
  object-fit: contain;
}

.gym-title {
  font-size: 16px;
  font-weight: 900;
  line-height: 18.29px;
}

.gym-stats {
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 8px;
}

.gym-stats>div {
  flex: 1;
}

.gym-stats h2 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}

.gym-stats p {
  font-size: 12px;
  font-weight: normal;
}

.gym-stats>div:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding-right: 16px;
}

.gym-stats>div:not(:first-child) {
  padding-left: 16px;
}

.gym-description {
  margin: 8px 0;
  font-size: 12px;
  color: #ccc;
}

.more-button {
  cursor: pointer;
}

.header-stats {
  display: flex;
  justify-content: right;
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
  height: 18px;
}
</style>
