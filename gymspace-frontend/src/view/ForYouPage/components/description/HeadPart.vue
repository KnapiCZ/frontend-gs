<script setup lang="ts">
import { IonRow } from '@ionic/vue';
import { VAvatar } from 'vuetify/lib/components/index.mjs';

const props = defineProps<{
    userHandle?: string,
}>()

</script>


<template>
    <IonRow>
        <VAvatar class="pfp" color="yellow" /> <!-- API PFP of  post owner -->
        <p class="userName">{{ userHandle }}</p>
        <button class="follow">Follow</button>
        <button class="notification">
            <img src="../../../../assets/icons/bell.svg" alt="">
        </button>
    </IonRow>
</template>

<style scoped>
ion-row {
    padding: 5px;
}

.pfp {
    width: 8vw;
    height: auto;
    aspect-ratio: 1;
    margin-right: 10px;
    margin-left: 10px;
}


.follow {
    color: black;
    height: 25px;
    width: 20%;
    background-color: white;
    margin: auto 10px auto auto;
    border-radius: 5px;
    font-weight: bold;
}

.notification {
    height: 25px;
    width: 25px;
    background-color: black;
    margin: auto 30px auto 0;
    border-radius: 5px;
}

img {
    color: white;
    width: 21px;
    height: 21px;
    margin: 2px;
}

.userName {
    font-weight: bold;
    color: white;
    margin: auto 10px;
    font-size: 18px;
}
</style>