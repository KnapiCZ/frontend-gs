<script setup lang="ts">
import { IonContent, IonPage, IonToolbar, IonButton, IonSegment, IonSegmentButton, IonSegmentView, IonSegmentContent } from '@ionic/vue'
import { userDataStore } from '@/stores/UserDataStore'
import { useIonRouter } from '@ionic/vue'
import ProfileTop from '../components/ProfileTop.vue'
import CurrentUserButton from '../components/Buttons/CurrentUserButton.vue'
import ProfileBasicInfo from '../components/ProfileBasicInfo.vue'
import OtherUserButton from '../components/Buttons/OtherUserButton.vue'
import apiUser from '@/logic/API/apiUser'
import { onMounted, ref } from 'vue'
import SmallFeed from '@/view/Post/components/SmallFeed.vue'

const router = useIonRouter()
const userStore = userDataStore()
const logged_user = localStorage.getItem("logged_user_id") as unknown as number

const props = defineProps<{
    renderedUser: number
}>()

const user = ref({
    username: "Not found",
    description: "",
    points: 0,
    count_followers: 0,
    count_posts: 0,
    profile_picture: "",
    background_picture: ""
})


const checkLogin = () => {
    if (props.renderedUser == logged_user) return true
    else return false
}

const loadUser = async () => {
    await apiUser("profile", props.renderedUser, undefined, "count_followers,count_posts,contacts,profile_picture,background_picture,username,points,description,").then((response) => {
        if (response.status == "success") {
            user.value = response.data
        }
    })
}


userStore.setDict(user.value)


onMounted(() => {
    loadUser()
})

</script>

<template>
    <IonPage class="ion-no-padding">
        <IonContent class="ion-no-padding" id="user">
            <IonToolbar v-if="renderedUser != logged_user">
                <IonButton slot="start" @click="router.back()" class="back-button" color="transparent">
                    <img src="@/assets/icons/arrowRight.svg">
                </IonButton>
            </IonToolbar>
            <ProfileTop :key="renderedUser + userStore.componentKey" :username="user.username"
                :background_picture="user.background_picture" :profile_picture="user.profile_picture"
                :count_posts="user.count_posts" :count_followers="user.count_followers" />
            <ProfileBasicInfo :description="user.description" :points="user.points"
                :key="renderedUser + userStore.componentKey + 100" />
            <CurrentUserButton v-if="checkLogin()" />
            <OtherUserButton v-else />
            <IonSegment mode="md">
                <IonSegmentButton value="posts" content-id="posts">
                    <img class="tab-image" src="../../../assets//new_icons/feed.svg" alt="">

                </IonSegmentButton>
                <IonSegmentButton value="challenges" content-id="challenges">
                    <img class="tab-image" src="../../../assets//new_icons/challenge.svg" alt="">
                </IonSegmentButton>
            </IonSegment>
            <IonSegmentView>
                <IonSegmentContent id="posts">
                    <SmallFeed />
                </IonSegmentContent>
                <IonSegmentContent id="challenges">HAHAchalalaHA</IonSegmentContent>
            </IonSegmentView>
        </IonContent>
    </IonPage>
</template>

<style scoped>
#user {
    text-align: center;
}

.back-button {
    height: 100%;
    aspect-ratio: 1;
    margin: 5px 10px;
}

.back-button img {
    rotate: 180deg;
}
</style>