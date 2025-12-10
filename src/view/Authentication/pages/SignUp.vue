<script setup lang="ts">
import { IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, useIonRouter } from "@ionic/vue"
import { computed, ref } from "vue"
import { watch } from "vue"
import { useRoute } from "vue-router"

// Router instance
const router = useIonRouter()
const route = useRoute()
const currentIndex = ref()
// Define total steps and their corresponding paths
const steps = [
    { path: "/step-1", step: 1, canSkip: false, canGoBack: true },
    { path: "/step-2", step: 2, canSkip: false, canGoBack: true },
    { path: "/step-3", step: 3, canSkip: false, canGoBack: false },
    { path: "/step-4", step: 4, canSkip: false, canGoBack: false },
    { path: "/step-5", step: 5, canSkip: false, canGoBack: false },
    { path: "/step-6", step: 6, canSkip: true, canGoBack: true },
    { path: "/step-7", step: 7, canSkip: true, canGoBack: true },
    { path: "/step-8", step: 8, canSkip: true, canGoBack: true },
]

// Determine the current step based on the path
const currentStep = computed(() => {
    const match = steps.find((step) => step.path === route.path)
    return match ? match.step : 1 // Default to step 1 if no match
})
// Navigate back function
const goBack = () => {
    currentIndex.value = steps.findIndex((step) => step.path === route.path)
    if (currentIndex.value > 0) {
        router.navigate(steps[currentIndex.value - 1].path, "back", "push")
    } else {
        router.navigate("/login", "back", "push")
    }
}
const skip = () => {
    currentIndex.value = steps.findIndex((step) => step.path === route.path)
    if (currentIndex.value < 7) {
        router.push(steps[currentIndex.value + 1].path) // Navigate to the previous step
    } else {
        router.push("/waiting-screen")
    }
}

watch(
    () => route.path,
    (newPath) => {
        const index = steps.findIndex((step) => step.path === newPath)
        if (index !== -1) {
            currentIndex.value = index
        } else {
            currentIndex.value = null
        }
    },
    { immediate: true },
)
</script>

<template>
  <IonPage class="ion-no-padding">
    <IonTabs class="ion-no-padding">
      <IonRouterOutlet />
      <template #bottom>
        <IonTabBar id="sign-up-tab">
          <IonTabButton
            v-if="currentIndex !== null"
            class="back-button"
            :disabled="!steps[currentIndex].canGoBack"
            @click="goBack"
          >
            <img
              src="../../../assets/icons/arrowBigLeft.png"
              alt="Back"
            >
          </IonTabButton>

          <div class="progress-dots">
            <div
              v-for="step in steps"
              :key="step.step"
              class="progress-dot"
              :class="{ active: step.step <= currentStep }"
            />
          </div>
          <IonTabButton
            v-if="currentIndex !== null"
            class="back-button skip"
            :disabled="!steps[currentIndex].canSkip"
            @click="skip"
          >
            <img
              src="../../../assets/icons/arrowBigLeft.png"
              alt="Back"
            >
          </IonTabButton>
        </IonTabBar>
      </template>
    </IonTabs>
  </IonPage>
</template>

<style scoped>
ion-tab--button {
    --ripple-color: transparent;
}

.skip {
    rotate: 180deg;
}

#sign-up-tab {
    --background: #242424b3;
    height: 70px;
    padding: 0 16px;
    border-radius: 6px 6px 0 0;
}

/* Back Button Styles */
.back-button {
    background: none;
}

.back-button img {
    width: 32px;
    aspect-ratio: 1;
}

/* Progress Dots Container */
.progress-dots {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    flex: 1;
}

/* Individual Progress Dots */
.progress-dot {
    width: 26px;
    height: 13px;
    border-radius: 3px;
    background-color: #666;
    /* Default color */
    transition: background-color 0.3s ease;
}

/* Active Progress Dot */
.progress-dot.active {
    background-color: #fff000;
    box-shadow: 0 0 6px #fff000;
    /* Highlight color */
}
</style>
