<script setup lang="ts">
import { IonRow } from '@ionic/vue';
import { VCard, VDialog } from 'vuetify/lib/components/index.mjs';

const props = defineProps<{
    name: string,
    description: string,
    logo: string,

}>
    ()

</script>

<template>
    <button :style="{ backgroundImage: 'url(' + props.logo + ')' }">
        &nbsp;
        <VDialog activator="parent" :persistent="false" transition="dialog-bottom-transition" :scrollable="true"
            width="75vw" height="70vh">
            <VCard>
                <div class=" top-info">
                    <img class="logo" :src="$props.logo">
                    <h1 class="name">{{ name }}</h1>
                    <p>The best boddybuilding club ever</p>
                    <p>hashtags?????</p>
                </div>

                <div class="description">
                    <h2>Description</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et
                        dolore magna aliqua.Elementum integer enim neque volutpat ac tincidunt.Felis bibendum ut tristique
                        et
                        egestas.Auctor augue mauris augue neque gravida in.Libero volutpat sed cras ornare arcu.Sit amet
                        consectetur adipiscing elit duis tristique.Sit amet justo donec enim diam vulputate ut pharetra sit.
                        Consectetur libero id faucibus nisl tincidunt eget.Elit pellentesque habitant morbi</p>
                </div>

                <h2 class="creator">Created by</h2>
                <IonRow>
                    <img class="pfp" :src="props.logo" alt="">
                    <p>@gymspace</p>
                </IonRow>
            </VCard>
        </VDialog>
    </button>
</template>

<style scoped>
.v-card {
    margin: auto;
    width: 75vw;
    height: 70vh;
    border-radius: 20px !important;
    background-color: rgba(14, 14, 14, 0.815);
    color: white;
    backdrop-filter: blur(8px);
}

button {
    display: inline-block;
    padding: 30% 50%;
    width: 100%;
    height: 100%;
    font-weight: bold;
    border-radius: 5px;
    background-size: contain;
    background-position: center center;
}

ion-row {
    margin: 10px;
}

.description {
    margin: 0 10px 30px 10px;
}

.description p {
    margin: 10px;
    font-size: 12px;
}

.logo {
    width: 30%;
    margin: 10px;
}

.top-info {
    text-align: center;
    margin: 0 10px 30px 10px;
}

.creator {
    margin: 10px;
}

.pfp {
    height: 40px;
}
</style>