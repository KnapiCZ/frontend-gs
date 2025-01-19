<script setup lang="ts">
import apiUser from '@/logic/API/apiUser';
import FollowButton from '../../../../shared/components/FollowButton.vue';
import { IonContent, IonRow } from '@ionic/vue';
import { ref } from 'vue';

const props = defineProps<{
    userId: number
    likeCount: number
    description?: string
    hashtags?: string
    songname?: string
}>();

let user = await apiUser("profile", props.userId, undefined, 'username,profile_picture').catch()
let text = ref(setText())

function setText() {
    if (props.likeCount == 1) { return 'Post was liked by ' + user.username }
    if (props.likeCount > 1) { return 'Post was liked by ' + user.username + ' and ' + (props.likeCount - 1) + ' others' }
    else return 'Post was liked by 0 users'
}

</script>


<template>
    <IonContent :scrollY="false" class="description" background-color="transparent">
        <IonRow>
            <img class="pfp" alt="Profile picture" :src="user.profile_picture" />
            <p class="userName">{{ user.username }}</p>
            <FollowButton :userId="props.userId" />
        </IonRow>
        <p id="middle-part" class="main-text">{{ description }}</p>
        <p id="middle-part" class="hashtags">{{ hashtags }}</p>
        <p id="middle-part" class="liked-text">{{ text }}
        </p>
    </IonContent>
</template>

<style scoped>
.description {
    width: 100%;
    height: 150px;
    --ion-background-color: transparent;
    position: absolute;
    bottom: 0;
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
    object-fit: contain;
    border-radius: 30px;
}


.follow {
    color: black;
    height: 25px;
    width: 20%;
    background-color: white;
    margin: auto auto auto 10px;
    border-radius: 5px;
    font-weight: bold;
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
    margin: 5px;
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

.profile-button {
    width: 25%;
    height: 25px;
    padding: 0;
    margin: 0 auto;
    color: black;
    background-color: white;
    font-weight: bold;
    border-radius: 10px;
    object-position: center;
}
</style>