<script setup lang="ts">
import { IonPopover, IonItem, IonList } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import apiPost from '@/logic/API/apiPost'
import EditPost from './EditPost.vue';

let userStore = userDataStore()
const props = defineProps<{
    userId: number
    postId: number
    description: string
}>()

let index = userStore.userPostsId.indexOf(props.postId)

async function Delete() {
    console.log(await apiPost("deletePost", props.postId, props.userId))
    userStore.userPostsId.splice(index, 1)
}
</script>

<template>
    <button :id="'popover-button' + props.postId" class="pop-button"><img src="../../../assets/icons/menu.svg">
    </button>
    <ion-popover :trigger="'popover-button' + props.postId" :dismiss-on-select="true" :arrow="false">
        <ion-list>
            <EditPost :index="index" :userId="props.userId" :postId="props.postId" :description="props.description" />
            <ion-item :button="true" :detail="false" lines="none" color="danger" @click="Delete()">Delete</ion-item>
        </ion-list>
    </ion-popover>
</template>