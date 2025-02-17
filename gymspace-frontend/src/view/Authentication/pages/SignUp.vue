<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, useIonRouter } from '@ionic/vue';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { watch } from "vue";


// Router instance
const router = useIonRouter();
const route = useRoute();
const currentIndex = ref(0)
// Define total steps and their corresponding paths
const steps = [
    { path: '/step-1', step: 1, canSkip: false, canGoBack: true },
    { path: '/step-2', step: 2, canSkip: false, canGoBack: true },
    { path: '/step-3', step: 3, canSkip: false, canGoBack: false },
    { path: '/step-4', step: 4, canSkip: false, canGoBack: false },
    { path: '/step-5', step: 5, canSkip: false, canGoBack: false },
    { path: '/step-6', step: 6, canSkip: true, canGoBack: true },
    { path: '/step-7', step: 7, canSkip: true, canGoBack: true },
    { path: '/step-8', step: 8, canSkip: true, canGoBack: true },
    { path: '/waiting-screen', step: 9, canSkip: true, canGoBack: true },


];

// Determine the current step based on the path
const currentStep = computed(() => {
    const match = steps.find((step) => step.path === route.path);
    return match ? match.step : 1; // Default to step 1 if no match
});
// Navigate back function
const goBack = () => {
    currentIndex.value = steps.findIndex((step) => step.path === route.path);
    if (currentIndex.value > 0) {
        router.navigate(steps[currentIndex.value - 1].path, 'back', 'push');
    }
    else {
        router.push("/login")
    }
};
const skip = () => {
    currentIndex.value = steps.findIndex((step) => step.path === route.path);
    if (currentIndex.value < 7) {
        router.push(steps[currentIndex.value + 1].path); // Navigate to the previous step
    }
    else {
        router.push("/waiting-screen")
    }
};

watch(
    () => route.path,
    (newPath) => {

        currentIndex.value = steps.findIndex((step) => step.path === newPath);
    },
    { immediate: true } // Run initially to set currentIndex on mount
);


</script>

<template>
    <IonPage class="ion-no-padding">
        <IonTabs class="ion-no-padding">
            <IonRouterOutlet></IonRouterOutlet>
            <IonTabBar slot="bottom" id="sign-up-tab">
                <IonTabButton class="back-button" @click="goBack" :disabled="!steps[currentIndex].canGoBack">
                    <img src="../../../assets/icons/arrowBigLeft.png" alt="Back" />
                </IonTabButton>

                <div class="progress-dots">
                    <div class="progress-dot" v-for="step in steps" :key="step.step"
                        :class="{ active: step.step <= currentStep }"></div>
                </div>
                <IonTabButton class="back-button skip" @click="skip" :disabled="!steps[currentIndex].canSkip">
                    <img src="../../../assets/icons/arrowBigLeft.png" alt="Back" />
                </IonTabButton>
            </IonTabBar>
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
    background-color: #242424b3 !important;
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
