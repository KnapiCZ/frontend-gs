<script setup lang="ts">
import { IonContent, IonRow } from '@ionic/vue';

const props = defineProps<{
    userHandle?: string,
    description?: string,
    hashtags?: string,
    songname?: string
}>()


</script>


<template>
    <IonContent :scrollY="false" class="description" background-color="transparent">
        <IonRow>
            <VAvatar class="pfp" color="yellow" /> <!-- API PFP of  post owner -->
            <p class="userName">{{ userHandle }}</p>
            <button class="follow">Follow</button>
            <button class="notification">
                <img id="icon" src="@/assets/icons/bell.svg" alt="notification">
            </button>
        </IonRow>
        <p id="middle-part" class="main-text">{{ description }}</p>
        <p id="middle-part" class="hashtags">{{ hashtags }}</p>
        <p id="middle-part" class="liked-text">Post was also liked by @gymshark and 81 others</p>
        <IonRow class='sound'>
            <img class="sound" src="@/assets/icons/note.svg" alt="note icon">
            <p class="sound">{{ songname }}</p>
        </IonRow>
    </IonContent>
</template>

<style scoped>
.description {
    width: 100%;
    height: 150px;
    --ion-background-color: transparent;
    position: absolute;
    bottom: 51px;
    left: 0;
    overflow: hidden;
}

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

#icon {
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



#middle-part {
    margin: 10px;
    color: white;
    font-size: 12px;
}

.main-text {
    font-weight: bold;
}

.hashtags,
.liked-text {
    margin-top: 3px;
    font-size: 12px;
    color: rgb(153, 153, 153);
}

ion-row.sound {
    margin-top: 10px;
    margin-left: calc(8vw + 23px);
    margin-right: 30px;
}

p.sound {
    font-weight: bold;
    color: white;
    font-size: 13px;
}

img.sound {
    margin: auto 10px auto 0;
    height: 13px;
}
</style>