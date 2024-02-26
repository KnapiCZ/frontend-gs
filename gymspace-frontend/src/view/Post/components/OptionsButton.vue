<script setup lang="ts">
import { IonPopover, IonItem, IonList } from '@ionic/vue';
import { sharedDataStore } from '@/stores/SharedDataStore';
import { userDataStore } from '@/stores/UserDataStore';
import apiPost from '@/logic/API/apiPost'
import EditPost from './EditPost.vue';

let sharedData = sharedDataStore()
let userStore = userDataStore()
const props = defineProps<{
    userId: number
    postId: number
    description: string
}>()

async function Delete() {
    console.log(await apiPost("deletePost", props.postId, props.userId))
    delete userStore.userPostsId[userStore.userPostsId.indexOf(props.postId)]
    sharedData.componentKey += 1
}
</script>

<template>
    <button :id="'popover-button' + props.postId" class="pop-button"><img src="../../../assets/icons/menu.svg"> </button>
    <ion-popover :trigger="'popover-button' + props.postId" :dismiss-on-select="true" :arrow="false">
        <ion-list>
            <EditPost :userId="props.userId" :postId="props.postId" :description="props.description" />
            <ion-item :button="true" :detail="false" lines="none" color="danger" @click="Delete()">Delete</ion-item>
        </ion-list>
    </ion-popover>
</template>

<style scoped>
.pop-button {
    width: 30px;
    aspect-ratio: 1;
    position: absolute;
    right: 0px;
    top: 0px;
    border-radius: 0 0 0 15px;
    background-color: black;
}

.pop-button img {
    width: 100%;
    height: 100%;
}
</style>