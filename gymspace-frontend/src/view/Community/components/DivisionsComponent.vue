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
    <swiper
      :modules="[Navigation]"
      :slides-per-view="2"
      :space-between="20"
      @swiper="(swiper) => (swiperRef = swiper)"
      class="swiper-container"
    >
      <swiper-slide v-for="division in divisions" :key="division.name">
        <div class="division-card">
            <img :src="'src/assets/images/' + division.image" :alt="division.name" class="division-image" />
            <div class="overlay">
                <h3>{{ division.name }}</h3>
                <p>SEE MORE <span><img src="../../../assets/icons/SwipeArrowRight.svg"></span></p>
            </div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="swipe-navigation">
      <button @click="slidePrev" class="nav-button"><img src="../../../assets/icons/SwipeArrowLeft.svg"></button>
      <p class="swipe-text">SWIPE FOR MORE DIVISIONS</p>
      <button @click="slideNext" class="nav-button"><img src="../../../assets/icons/SwipeArrowRight.svg"></button>
    </div>
  </div>
</template>

<style scoped>

.divisions-container {
    width: 100%;
    text-align: center;
    margin-top: -20px;
}

.swiper-container {
    width: 100%;
    padding: 20px 0;
}

.division-card {
    position: relative;
    width: 100%;
    height: 180px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.division-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 25px;
}

.overlay {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    backdrop-filter: blur(26.6px);
    box-shadow: -4px 4px 19.9px 1px #0000009e;
    padding: 10px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: start;
}

.overlay p {
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
    opacity: 0.8;
}

.swipe-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}

.nav-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 0 15px;
    transition: transform 0.2s ease-in-out;
}

.nav-button:hover {
    transform: scale(1.2);
}

.swipe-text {
    color: white;
    font-size: 14px;
    opacity: 0.7;
    padding-top: 4px;
}

</style>
