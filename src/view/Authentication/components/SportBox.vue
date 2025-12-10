<script setup lang="ts">
import { useIonRouter } from "@ionic/vue"

import { userDataStore } from "@/stores/UserDataStore"

const router = useIonRouter()
const userStore = userDataStore()
const props = defineProps<{
    title: string
    description: string
    imageSrc: string
    sportId: number
}>()

const toggleGlow = () => {
    userStore.addToDict("registerData", "sports", [props.sportId])
    router.push("/step-5")
}
</script>

<template>
  <div
    class="card"
    @click="toggleGlow"
  >
    <div class="image-container">
      <img
        :src="imageSrc"
        alt=""
        class="image"
      >
    </div>
    <div class="text-container border-gradient">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>


<style scoped>
.card {
    position: relative;
    width: 100%;
    height: 12vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-top: 3vh;
}

.image-container {
    position: absolute;
    top: -70%;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 0;
}

.image {
    width: 110%;
    height: auto;
}

.text-container {
    background: transparent;
    padding: 10px;
    border-radius: 6px;
    text-align: left;
    z-index: 2;
    backdrop-filter: blur(10px);
    aspect-ratio: 164/70;
    transition: box-shadow 0.3s ease;
}

h3 {
    font-size: 1rem;
    font-weight: 900;
}

p {
    font-size: 0.8rem;
}

.border-gradient::before {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: 6px;
    padding: 1px;
    background: linear-gradient(135deg, #fff 4%, #ffffff75 52%, #ffffff59 80%) #fff00021;
    mask:
        linear-gradient(white 0 0) content-box,
        linear-gradient(white 0 0);
    -webkit-mask:
        linear-gradient(white 0 0) content-box,
        linear-gradient(white 0 0);
    mask-composite: exclude;
}
</style>
