<script setup lang="ts">
import { IonRow, IonCol, IonToolbar, IonButtons, modalController, IonButton, IonTitle } from '@ionic/vue';
import BioButton from './BioButton.vue';
import { ref } from 'vue';

function closeModal() {
    modalController.dismiss();
}

let props = defineProps<{
    logo?: string,
    name?: string,
}>()

let FollowMembers = ref([26, 56]);
let isFollowing = [false, false];

async function followJoin(type: number) {
    if (isFollowing[type]) {
        isFollowing[type] = !isFollowing[type];
        FollowMembers.value[type] -= 1;
    }
    else {
        isFollowing[type] = !isFollowing[type];
        FollowMembers.value[type] += 1;
    }
}


</script>

<template>
    <IonToolbar>
        <IonButtons slot="start">
            <IonButton :onclick="closeModal" class="back-button"><img src="../../../../assets/icons/arrowRight.svg">
            </IonButton>
        </IonButtons>
        <IonTitle>{{ name }}</IonTitle>
    </IonToolbar>
    <IonRow id="background">
        <IonCol class="column" size="4">
            <BioButton class="logo" :logo="props.logo" :name="props.name" :description="'NIGAAAA'" />
            <p class="top">{{ props.name }}</p>
        </IonCol>
        <IonCol class="column" size="3">
            <p class="top">{{ FollowMembers[0] }}</p> <!-- API username-->
            <p class="bottom">followers</p> <!-- API username-->

            <button class="follow" :class="{ following: isFollowing[0] }" @click="followJoin(0)">
                {{ isFollowing[0] ? 'Following' : 'Follow' }}
            </button>
        </IonCol>
        <IonCol class="column" size="3">
            <p class="top">{{ FollowMembers[1] }}</p>
            <p class="bottom">Members</p>

            <button class="join" :class="{ joined: isFollowing[1] }" @click="followJoin(1)">
                {{ isFollowing[1] ? 'Joined' : 'Join' }}
            </button>
        </IonCol>
    </IonRow>
</template>

<style scoped>
div.toolbar-container * {
    background-color: black;
}


.follow,
.join {
    width: 90%;
    height: fit-content;
    border-radius: 20px;
    color: black;
    font-weight: bold;
    transition: color 0.5s ease;
}

.follow {
    border: 2px solid #e8e20a;
    background-color: #e8e20a;
    transition: background-color 0.5s ease;

}

.following {
    background-color: transparent;
    color: #e8e20a;
}

.join {
    border: 2px solid white;
    background-color: white;
    transition: background-color 0.5s ease;

}

.joined {
    background-color: transparent;
    color: white;
}

.back-button {
    height: 100%;
    aspect-ratio: 1;
}

.back-button img {
    rotate: 180deg;
}

.top {
    font-weight: bold;
    font-size: 24px;
}

.bottom {
    margin-bottom: 10px;
}

#background {
    position: relative;
    margin: auto;
    width: 100vw;
    max-height: 200px;
    text-align: center;
    background-color: black;
}

.column {
    max-height: 160px;
    margin-top: auto;
    margin-bottom: 20px;
    margin-left: 10px;
}

.logo {
    height: auto;
    margin: 0;
    margin-top: 10px;
}
</style>
