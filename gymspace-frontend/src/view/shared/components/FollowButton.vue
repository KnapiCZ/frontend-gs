<script setup lang="ts">
import apiUser from "@/logic/API/apiUser"
import { IonButton } from "@ionic/vue"
import { ref } from "vue"

const props = defineProps<{
    userId: number
}>()
const isFollowing = ref()

let loggedUserId = localStorage.getItem("logged_user_id")
isFollowing.value = await apiUser("isFollowing", props.userId)

const follow = async () => {
    await apiUser("follow", props.userId).then(
        ((isFollowing.value.is_following as any) = !isFollowing.value.is_following as any),
    )
}
</script>

<template>
    <IonButton class="default" :class="{ follow: !isFollowing.is_following }" @click="follow">
        {{ isFollowing.is_following ? "Following" : "Follow" }}
    </IonButton>
</template>

<style scoped>
.follow {
    --background: #fff000;
    color: black;
}
</style>
