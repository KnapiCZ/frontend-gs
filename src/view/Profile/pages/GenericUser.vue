<script setup lang="ts">
import {
    IonButton,
    IonContent,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonSegmentContent,
    IonSegmentView,
    IonToolbar,
} from "@ionic/vue"
import { useIonRouter } from "@ionic/vue"
import { onMounted, ref } from "vue"

import apiUser from "@/logic/API/apiUser"
import { User } from "@/logic/types/user"
import { userDataStore } from "@/stores/UserDataStore"
import SmallFeed from "@/view/Post/components/SmallFeed.vue"

import ActionsPanel from "../components/Buttons/ActionsPanel.vue"
import ProfileBasicInfo from "../components/ProfileBasicInfo.vue"
import ProfileTop from "../components/ProfileTop.vue"

const router = useIonRouter()
const userStore = userDataStore()
const logged_user = localStorage.getItem("logged_user_id") as unknown as number

const props = defineProps<{
    renderedUser: number
}>()

const user = ref<Pick<User, "full_name" | "username" | "description" | "points" | "count_followers" | "count_posts" | "profile_picture" | "background_picture">>({
    full_name: "",
    username: "",
    description: "",
    points: 0,
    count_followers: 0,
    count_posts: 0,
    profile_picture: "",
    background_picture: "",
})
const checkLogin = () => {
    if (props.renderedUser == logged_user) return true
    else return false
}

const loadUser = async () => {
    await apiUser.getProfile(props.renderedUser, [
        "count_followers",
        "count_posts",
        "contacts",
        "profile_picture",
        "background_picture",
        "username",
        "full_name",
        "points",
        "description",
        "pronouns",
        "sex"
    ]).then((response) => {
        if (response.status == "success" && response.data) {
            user.value = response.data
            userStore.setDict(response.data)
        }
    })
}

onMounted(() => {
    loadUser()
})
</script>

<template>
  <IonPage class="ion-no-padding">
    <IonContent
      id="user"
      class="ion-no-padding"
    >
      <IonToolbar v-if="renderedUser != logged_user">
        <template #start>
          <IonButton 
            class="back-button"
            color="transparent"
            @click="router.back()"
          >
            <img src="@/assets/icons/arrowRight.svg">
          </IonButton>
        </template>
      </IonToolbar>
      <ProfileTop
        :id="logged_user"
        :key="renderedUser + userStore.componentKey"
        :full-name="user.full_name"
        :username="user.username"
        :background-picture="user.background_picture"
        :profile-picture="user.profile_picture"
        :count-posts="user.count_posts"
        :count-followers="user.count_followers"
      />
      <ProfileBasicInfo
        :key="renderedUser + userStore.componentKey + 100"
        :description="user.description"
        :points="user.points"
      />
      <ActionsPanel
        :is-curent-user="checkLogin()"
        :user-id="renderedUser"
      />
      <IonSegment mode="md">
        <IonSegmentButton
          value="posts"
          content-id="posts"
        >
          <img
            class="tab-image"
            src="../../../assets//new_icons/feed.svg"
            alt=""
          >
        </IonSegmentButton>
        <IonSegmentButton
          value="challenges"
          content-id="challenges"
        >
          <img
            class="tab-image"
            src="../../../assets//new_icons/challenge.svg"
            alt=""
          >
        </IonSegmentButton>
      </IonSegment>
      <IonSegmentView>
        <IonSegmentContent id="posts">
          <SmallFeed :user-id="renderedUser" />
        </IonSegmentContent>
        <IonSegmentContent id="challenges">
          HAHAchalalaHA
        </IonSegmentContent>
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

ion-segment-view {
    height: auto;
}
</style>
