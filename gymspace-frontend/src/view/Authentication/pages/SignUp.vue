<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton } from '@ionic/vue';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// Router instance
const router = useRouter();
const route = useRoute();

// Define total steps and their corresponding paths
const steps = [
    { path: '/step-1', step: 1 },
    { path: '/step-2', step: 2 },
    { path: '/step-3', step: 3 },
    { path: '/step-4', step: 4 },
    { path: '/step-5', step: 5 },
    { path: '/step-6', step: 6 },
    { path: '/step-7', step: 7 },
];

// Determine the current step based on the path
const currentStep = computed(() => {
    const match = steps.find((step) => step.path === route.path);
    return match ? match.step : 1; // Default to step 1 if no match
});

// Navigate back function
const goBack = () => {
    const currentIndex = steps.findIndex((step) => step.path === route.path);
    if (currentIndex > 0) {
        router.push(steps[currentIndex - 1].path); // Navigate to the previous step
    }
};
</script>

<template>
    <IonPage class="ion-no-padding">
        <IonTabs class="ion-no-padding">
            <IonRouterOutlet></IonRouterOutlet>
            <IonTabBar slot="bottom" id="sign-up-tab">
                <IonTabButton class="back-button" @click="goBack">
                    <img src="../../../assets/icons/arrowBigLeft.png" alt="Back" />
                </IonTabButton>

                <div class="progress-dots">
                    <div class="progress-dot" v-for="step in steps" :key="step.step"
                        :class="{ active: step.step <= currentStep }"></div>
                </div>
            </IonTabBar>
        </IonTabs>
    </IonPage>
</template>

<style scoped>
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
    width: 36px;
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
