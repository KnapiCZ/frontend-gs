<script setup lang="ts">
import { IonButton } from "@ionic/vue"
import { ref } from "vue"

import apiUser from "@/logic/API/apiUser"

const props = defineProps<{
    userId: number
}>()
const isFollowing = ref()

isFollowing.value = await apiUser.isFollowing(props.userId,12)

const follow = async () => {
    await apiUser.follow(props.userId)
    isFollowing.value.is_following = !isFollowing.value.is_following
}
</script>

<template>
  <IonButton
    class="default"
    :class="{ follow: !isFollowing.is_following }"
    @click="follow"
  >
    {{ isFollowing.is_following ? "Following" : "Follow" }}
  </IonButton>
</template>

<style scoped>
.follow {
    --background: #fff000;
    color: black;
}
</style>
