<script lang="ts" setup>
import {
    IonContent,
    IonButton,
    modalController,
    IonRow,
    IonCol,
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';

</script>

<template>
    <ion-content class="ion-padding" :scroll-y="false">
        <div class="gym-bio">
            <img class="logo" src="../../../assets/images/logo-glow.png" alt="">
            <div class="gym-info">
                <h2>NEW PARK</h2>
                <p class="bio-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Quisque tincidunt scelerisque libero</p>
                <a href="newpark.cz"></a>
            </div>
        </div>
        <IonRow>
            <IonCol>
                <p class="number">5435</p>
                <p class="small-title">posts</p>
            </IonCol>
            <IonCol class="middle-niggle">
                <p class="number">452</p>
                <p class="small-title">joined</p>
            </IonCol>
            <IonCol>
                <p class="number">1000</p>
                <p class="small-title">spoting</p>
            </IonCol>
        </IonRow>
        <div class="gym-preview">
            COMING SOON...
        </div>
        <IonButton fill="solid" class="sign-up-button" @click="">JOIN THIS GYM</IonButton>
    </ion-content>
</template>

<style scoped>
ion-content {
    text-align: center;
}

.gym-bio {
    display: grid;
    width: 94%;
    grid-template-columns: 25% 75%;
    margin: 0 3%;
    border-bottom: solid white 1px;
    margin-bottom: 10px;
}

.bio-text {
    font-size: 12px;
}

.logo {
    text-align: center;
    width: 90%;
    margin: auto;
    aspect-ratio: 1/1 !important;
    border-radius: 100px;
    border: solid 2px #fff000;
    object-fit: cover;
    object-position: center;
    display: inline-block;
}

.gym-info {
    width: 100%;
    margin: auto;
    padding: 10px;
    text-align: left;
    display: inline-block;
}


h2 {
    font-size: 1.5rem;
}

.gym-preview {
    width: 87%;
    text-align: center;
    line-height: 47px;
    background-image: url("../../../assets/images/Cover Image.png");
    height: 47px;
    margin: 10px auto;
    border-radius: 6px;
}

.number {
    font-size: 18px;
    font-weight: 700;
}

.middle-niggle {
    border-left: solid white 1px;
    border-right: solid white 1px;
}
</style>
