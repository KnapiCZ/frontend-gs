<script setup>
import { IonContent, IonPage } from '@ionic/vue';
import SportBox from '../components/SportBox.vue';
import apiSport from '@/logic/API/apiSport';

let sports = await apiSport("allSports")
</script>

<template>
    <IonPage>
        <IonContent>
            <h1 class="sign-up">Choose your sports</h1>

            <div class="grid-container">
                <SportBox v-for="sport in sports" :key="sport.id" :title="sport.title" :description="sport.description"
                    :imageSrc="sport.sport_image" :sport_id="sport.id" />
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
