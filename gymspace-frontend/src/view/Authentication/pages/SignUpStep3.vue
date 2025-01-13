<script setup>
import { IonContent, IonPage } from '@ionic/vue';
import SportBox from '../components/SportBox.vue';
import Bodybuilding from '@/assets/images/Bodybuilding.png';
import Powerlifting from '@/assets/images/Powerlifting.png';
import Calisthenics from '@/assets/images/Calisthenics.png';
import Strongmen from '@/assets/images/Strongmen.png';
import Fighting from '@/assets/images/Fighting.png';
import CrossFit from '@/assets/images/CrossFit.png';
const cards = [
    { title: "Bodybuilding", description: "Sculpt your dream physique.", imageSrc: Bodybuilding, id: 0 },
    { title: "Powerlifting", description: "Lift heavy. Get stronger.", imageSrc: Powerlifting, id: 1 },
    { title: "Calisthenics", description: "Master your body's strength.", imageSrc: Calisthenics, id: 2 },
    { title: "Strongmen", description: "Unleash unstoppable power.", imageSrc: Strongmen, id: 3 },
    { title: "Fighting", description: "Dominate the ring. Own the fight.", imageSrc: Fighting, id: 4 },
    { title: "Crossfit", description: "Push limits. Break barriers.", imageSrc: CrossFit, id: 5 },
];
</script>

<template>
    <IonPage>
        <IonContent>
            <h1 class="sign-up">Choose your sports</h1>

            <div class="grid-container">
                <SportBox v-for="(card, index) in cards" :key="index" :title="card.title"
                    :description="card.description" :imageSrc="card.imageSrc" :sport_id="card.id" />
            </div>
        </IonContent>
    </IonPage>
</template>


<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 42%);
    grid-template-rows: repeat(3, 16vh);
    justify-content: center;
    /* Add spacing between columns */
    align-items: center;
    /* Center items vertically */
    gap: 10px;
    /* Spacing between rows */
    box-sizing: border-box;
}

.grid-container>* {
    position: relative;
}
</style>
