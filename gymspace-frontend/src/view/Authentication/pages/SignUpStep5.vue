<script lang="ts" setup>
import { IonContent, IonPage, IonButton, IonCol } from "@ionic/vue";
import { ref, nextTick, onMounted } from "vue";

const currentNumber = ref(175);
const touchStartX = ref(0);

// Simplified scaleSteps as an array of values
const scaleSteps = ref(Array.from({ length: 11 }, (_, i) => currentNumber.value + i - 4));
const visibleScaleSteps = ref(scaleSteps.value.slice(0, 9));

const onTouchStart = (e: TouchEvent) => {
    touchStartX.value = e.touches[0].clientX;
};

const onTouchMove = (e: TouchEvent) => {
    const deltaX = e.touches[0].clientX - touchStartX.value;
    if (Math.abs(deltaX) > 10) {
        changeValue(deltaX);
        touchStartX.value = e.touches[0].clientX;
    }
};

const onTouchEnd = () => { };

// Update visibleScaleSteps and manually trigger transformations
const changeValue = async (delta: number) => {
    const step = delta > 0 ? -1 : 1;
    currentNumber.value = Math.max(0, currentNumber.value + step);

    // Adjust the scale steps to match the swipe direction
    if (delta < 0) {
        scaleSteps.value.push(scaleSteps.value[scaleSteps.value.length - 1] + 1);
        scaleSteps.value.shift();
    } else {
        scaleSteps.value.unshift(scaleSteps.value[0] - 1);
        scaleSteps.value.pop();
    }

    visibleScaleSteps.value = [...scaleSteps.value.slice(0, 9)];

    // Wait for the DOM to update before applying transformations
    await nextTick();
    updateTransformations();
};

// Update transformations using basic TypeScript and DOM manipulation
const updateTransformations = () => {
    const centerValue = currentNumber.value;

    visibleScaleSteps.value.forEach((item) => {
        const element = document.getElementById(`scale-line-${item}`);
        if (element) {
            const distanceFromCenter = Math.abs(centerValue - item);
            const scaleFactor = 1 / Math.pow(1.5, distanceFromCenter); // Apply scaling: 1 / (2^distance)
            const opacityFactor = Math.max(0.2, 1 - distanceFromCenter * 0.15); // Decrease opacity with distance

            element.style.transform = `scaleY(${Math.max(0.1, scaleFactor)})`;
            element.style.opacity = opacityFactor.toString();
            element.style.transition = "transform 0.1s ease, opacity 0.1s ease";

            // Update active class manually
            if (item === centerValue) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        }
    });
};

// Update transformations on mount to initialize correctly
onMounted(() => {
    updateTransformations();
});
</script>

<template>
    <IonPage>
        <IonContent class="sign-up-content">
            <img src="../../../assets/images/height.png" class="sign-up-background-image" alt="Cake" />
            <h1 class="sign-up">Choose your height...</h1>
            <div class="swiper-container" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
                <div class="value-display">
                    <IonCol>
                        <p class="value">{{ currentNumber }}</p>
                        <p class="unit">kg</p>
                    </IonCol>
                </div>
                <div class="scale-lines">
                    <div v-for="item in visibleScaleSteps" :key="item" :id="'scale-line-' + item"
                        :class="['scale-line', { 'active': item === currentNumber }]">
                    </div>
                </div>
            </div>
            <IonButton fill="solid" class="signup-btn" @click="">NEXT</IonButton>
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
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #2424246c;
    border: 1px solid transparent;
    border-image: linear-gradient(45deg, #ffffffce 0%, #ffffff5b 10%, #fff00059 72%, #fff000 100%) 1;
    background-clip: padding-box;
    backdrop-filter: blur(25px);
    z-index: 1;
}

.value-display {
    text-align: center;
    font-size: 48px;
    font-weight: bold;
}

.unit {
    border-bottom: 1px solid #fff;
    font-size: 16px;
    padding-bottom: 5px;
    font-weight: 300;
    color: #aaa;
}

.scale-lines {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 400px;
    height: 90px;
    overflow: hidden;
}

.scale-line {
    width: 2px;
    height: 100px;
    margin: 0 10px;
    background-color: #fff;
    text-align: center;
    transition: transform 0.2s ease, opacity 0.2s ease;
}
</style>
