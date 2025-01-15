<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import ChallengeSlider from '@/view/Challenges/pages/ChallengeSlider.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { userDataStore } from '@/stores/UserDataStore';

let userStore = userDataStore()

</script>

<template>
    <IonPage>
        <IonContent>
            <div id="category" v-for="row in [1, 2, 3, 4, 5]">
                <p id="category-name">
                    nazev kategorie
                </p>
                <div class="grid-container">
                    <div id="arrow-wrapper">
                        <img class="arrow" src="../../../assets/icons/arrowBigLeft.png" alt="">
                    </div>
                    <Swiper :slides-per-view="3" direction="horizontal" :space-between="2">
                        <SwiperSlide v-for="index in [1, 2, 3, 5, 5, 5, 5, 5, 5, 5]">
                            <ChallengeSlider :id="index" :row="index" @cardAccepted="handleCardAccepted"
                                @cardRejected="handleCardRejected" @cardSkipped="handleCardSkipped"
                                @hideCard="removeCardFromDeck" />
                        </SwiperSlide>
                    </Swiper>
                    <div id="arrow-wrapper">
                        <img class="arrow" src="../../../assets/icons/arrowBigRight.png" alt="">
                    </div>
                </div>
            </div>
        </IonContent>
    </IonPage>
</template>

<script lang="ts">
export default {
    name: "App",

    data() {
        return {
            visibleCards: ["Test", "Vue.js", "Webpack"]
        };
    },

    methods: {
        handleCardAccepted() {
            console.log("handleCardAccepted");
        },
        handleCardRejected() {
            console.log("handleCardRejected");
        },
        handleCardSkipped() {
            console.log("handleCardSkipped");
        },
        removeCardFromDeck() {
            this.visibleCards.shift();
        }
    }
};
</script>


<style scoped>
#category-name {
    width: 50%;
    padding: 5px 0 5px 0;
    margin: 15px auto 10px auto;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    border-radius: 5px;
    color: black;
    background-color: #fff000;
    box-shadow: 0px 0px 20px #fff000;
}

div.swiper {
    height: fit-content;
    width: 100%;
}

.grid-container {
    display: grid;
    width: 100%;
    height: fit-content;
    grid-template-columns: 10% 80% 10%;
    margin: 0;
}

#arrow-wrapper {
    position: relative;
}

#category {
    width: 100%;
    height: 20vh;
}



.arrow {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>