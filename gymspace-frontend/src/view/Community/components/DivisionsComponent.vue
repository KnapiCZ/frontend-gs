<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { ref } from 'vue';
import { Navigation } from 'swiper/modules';

//tady se kdyžtak dopíše odkaz na jednotlivé divize
const divisions = [
    { name: "Bodybuilding", image: "Bodybuilding.png" },
    { name: "Powerlifting", image: "Powerlifting.png" },
    { name: "Calisthenics", image: "Calisthenics.png" },
    { name: "Strongmen", image: "Strongmen.png" },
    { name: "Fighting", image: "Fighting.png" },
    { name: "Crossfit", image: "Crossfit.png" }
];

const swiperRef = ref(null);

const slidePrev = () => {
    if (swiperRef.value) swiperRef.value.slidePrev();
};

const slideNext = () => {
    if (swiperRef.value) swiperRef.value.slideNext();
};

</script>

<template>
    <div class="divisions-container">
        <swiper :modules="[Navigation]" :slides-per-view="2" :space-between="0"
            @swiper="(swiper) => (swiperRef = swiper)" class="swiper-container">
            <swiper-slide v-for="division in divisions" :key="division.name">
                <div class="division-card box">
                    <img :src="'src/assets/images/' + division.image" :alt="division.name" class="division-image" />
                    <div class="overlay border-gradient">
                        <h3>{{ division.name }}</h3>
                        <p class="smallest-text row">SEE MORE <span><img
                                    src="../../../assets/icons/SwipeArrowRight.svg"></span></p>
                    </div>
                </div>
            </swiper-slide>
        </swiper>

        <div class="row">
            <button @click="slidePrev" class="nav-button"><img src="../../../assets/icons/SwipeArrowLeft.svg"></button>
            <p class="swipe-text">SWIPE FOR MORE DIVISIONS</p>
            <button @click="slideNext" class="nav-button"><img src="../../../assets/icons/SwipeArrowRight.svg"></button>
        </div>
    </div>
</template>

<style scoped>
.divisions-container,
.swiper-container {
    width: 100%;
}

.division-card {
    width: 100%;
    height: 140px;
}

.division-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    margin-bottom: 40px;
}

.overlay {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
    box-shadow: -4px 4px 19.9px 1px #0000009e;
    padding: 10px;
    text-align: left;
}

.overlay::before {
    background: linear-gradient(to bottom,
            rgb(173, 173, 173) 4.06%,
            rgba(170, 170, 170, 0.46) 45.45%,
            rgba(22, 22, 22, 0.13) 100%);
}

.overlay img {
    height: 10px;
}

.nav-button {
    font-size: 24px;
    cursor: pointer;
    padding: 0 15px;
    transition: transform 0.2s ease-in-out;
}

.nav-button:hover {
    transform: scale(1.2);
}

.swipe-text {
    opacity: 0.7;
    padding-top: 4px;
}
</style>
