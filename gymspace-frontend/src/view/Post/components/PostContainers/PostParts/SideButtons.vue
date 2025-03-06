<script setup lang="ts">
import LikeButton from '@/view/shared/components/LikeButton.vue';
import OptionsButton from '../../OptionsButton.vue';
import { userDataStore } from '@/stores/UserDataStore';

const userStore = userDataStore()
const props = defineProps<{
    postId: number
    userId: number
    description: string
}>()

</script>

<template>
    <div>
        <LikeButton class="postBtn" :userId="userStore.loggedUserId" :postId="props.postId" />
        <OptionsButton v-if="props.userId == userStore.loggedUserId" class="items" :userId="props.userId"
            :postId="props.postId" :description="props.description" />
    </div>
</template>

<style scoped>
.items {
    width: 30px;
    height: 30px;
    margin: 15px;
    display: block;
}

.pop-button {
    position: relative;
    right: none;
    top: none;
    border-radius: 15px;

}

div {
    height: fit-content;
    width: fit-content;
    position: absolute;
    right: 10px;
    bottom: 200px;
}
</style>