<script setup lang="ts">
import { VTab, VWindow, VWindowItem } from 'vuetify/lib/components/index.mjs';
import { IonContent, IonPage } from '@ionic/vue';
import GridLayout from '../../Post/components/GridLayout.vue';
import TopGym from '../components/ClubGym/GymTop.vue'
import FeedPost from '@/view/Post/components/Feed/FeedPost.vue';
import json from '@/assets/mocs/profilepost.json'
import apiGym from '@/logic/API/apiGym';

let props = defineProps<{
    logo?: string,
    name?: string
}>()

const baseUrl = await apiGym()

</script>


<template>
    <IonPage>
        <IonContent>
            <TopGym :logo="props.logo" :name="props.name"> </TopGym>

            <VTabs v-model="tab" color="#e8e20a" bg-color="black" align-tabs="center" slider-color="#e8e20a" :grow='true'>
                <VTab><img src="../../../assets/icons/feed.svg" alt="feed"></VTab>
                <VTab><img src="../../../assets/icons/challenges.svg" alt="challenges"></VTab>
                <VTab><img src="../../../assets/icons/challenges.svg" alt="challenges"></VTab>
            </VTabs>

            <VWindow v-model="tab">
                <VWindowItem>
                    <FeedPost v-for="object in myJson" :image="baseUrl + object.thumbSRC" :description="object.description"
                        :date="object.date" :userhandle="object.userhandle" :username="object.username" />
                </VWindowItem>
                <VWindowItem>
                    <GridLayout></GridLayout>
                </VWindowItem>
                <VWindowItem>
                    <GridLayout></GridLayout>
                </VWindowItem>
            </VWindow>
        </IonContent>
    </IonPage>
</template>


<script lang="ts">
export default {
    data: () => ({
        tab: null,
        myJson: json,
    }),
}
</script>

<style scoped>
.v-window {
    padding-top: 30px;
    height: fit-content;
    width: 100%;
    text-align: center;

}

.v-window__container {
    height: 100%;
    width: 100%;

}
</style>
@/logic/API/apiUser