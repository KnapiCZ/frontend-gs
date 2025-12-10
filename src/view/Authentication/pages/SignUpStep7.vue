<script lang="ts" setup>
import { IonButton, IonContent, IonPage, useIonRouter } from "@ionic/vue"
import { nextTick, onMounted,ref } from "vue"

import { userDataStore } from "@/stores/UserDataStore"

const router = useIonRouter()
const userStore = userDataStore()
const currentNumber = ref(85)
const touchStartX = ref(0)

// Simplified scaleSteps as an array of values
const scaleSteps = ref(Array.from({ length: 11 }, (_, i) => currentNumber.value + i - 4))
const visibleScaleSteps = ref(scaleSteps.value.slice(0, 9))

const onTouchStart = (e: TouchEvent) => {
    touchStartX.value = e.touches[0].clientX
}

const onTouchMove = (e: TouchEvent) => {
    const deltaX = e.touches[0].clientX - touchStartX.value
    if (Math.abs(deltaX) > 10) {
        changeValue(deltaX)
        touchStartX.value = e.touches[0].clientX
    }
}

// Update visibleScaleSteps and manually trigger transformations
const changeValue = async (delta: number) => {
    const step = delta > 0 ? -1 : 1
    currentNumber.value = Math.max(0, currentNumber.value + step)

    // Adjust the scale steps to match the swipe direction
    if (delta < 0) {
        scaleSteps.value.push(scaleSteps.value[scaleSteps.value.length - 1] + 1)
        scaleSteps.value.shift()
    } else {
        scaleSteps.value.unshift(scaleSteps.value[0] - 1)
        scaleSteps.value.pop()
    }

    visibleScaleSteps.value = [...scaleSteps.value.slice(0, 9)]

    // Wait for the DOM to update before applying transformations
    await nextTick()
    updateTransformations()
}

// Update transformations using basic TypeScript and DOM manipulation
const updateTransformations = () => {
    const centerValue = currentNumber.value

    visibleScaleSteps.value.forEach((item) => {
        const element = document.getElementById(`scale-line-${item}`)
        if (element) {
            const distanceFromCenter = Math.abs(centerValue - item)
            const scaleFactor = 1 / Math.pow(1.5, distanceFromCenter) // Apply scaling: 1 / (2^distance)
            const opacityFactor = Math.max(0.2, 1 - distanceFromCenter * 0.15) // Decrease opacity with distance

            element.style.transform = `scaleY(${Math.max(0.1, scaleFactor)})`
            element.style.opacity = opacityFactor.toString()
            element.style.transition = "transform 0.1s ease, opacity 0.1s ease"

            // Update active class manually
            if (item === centerValue) {
                element.classList.add("active")
            } else {
                element.classList.remove("active")
            }
        }
    })
}

const setWeigth = () => {
    userStore.addToDict("registerData", "weight", currentNumber.value)
    router.push("step-8")
}

// Update transformations on mount to initialize correctly
onMounted(() => {
    updateTransformations()
})
</script>

<template>
  <IonPage>
    <IonContent
      class="sign-up-content top-padding-notch"
      :scroll-y="false"
    >
      <img
        src="../../../assets/images/weight.png"
        class="sign-up-background-image"
        alt="Cake"
      >
      <h1 class="sign-up">
        Choose your weight...
      </h1>
      <div
        class="swiper-container border-gradient"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
      >
        <div>
          <div class="column">
            <h1 class="value">
              {{ currentNumber }}
            </h1>
            <p class="unit">
              cm
            </p>
          </div>
        </div>
        <div class="scale-lines row">
          <div
            v-for="item in visibleScaleSteps"
            :id="'scale-line-' + item"
            :key="item"
            :class="['scale-line', { active: item === currentNumber }]"
          />
        </div>
      </div>
      <IonButton
        fill="solid"
        class="sign-up-button"
        @click="setWeigth"
      >
        NEXT
      </IonButton>
    </IonContent>
  </IonPage>
</template>

<style scoped>
.swiper-container {
    width: 87%;
    aspect-ratio: 1.4/1;
    color: #fff;
    margin: auto;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #2424246c;
    backdrop-filter: blur(25px);
    z-index: 1;
}

.border-gradient::before {
    background: linear-gradient(45deg, #ffffffce 0%, #ffffff5b 10%, #fff00059 72%, #fff000 100%);
}

.value {
    font-size: 48px;
    font-weight: 900;
}

.unit {
    font-size: 16px;
    padding-bottom: 5px;
    font-weight: 300;
    color: #aaa;
}

.scale-lines {
    justify-content: center;
    margin-top: 20px;
    width: 400px;
    height: 90px;
    overflow: hidden;
}

.scale-line {
    width: 1px;
    height: 100px;
    margin: 0 12px;
    background-color: #fff;
    text-align: center;
    transition:
        transform 0.2s ease,
        opacity 0.2s ease;
}

.column {
    width: 100%;
    border-bottom: 1px solid #fff;
}
</style>
