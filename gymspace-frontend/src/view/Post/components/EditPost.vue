<script setup lang="ts">
import { IonButton, IonContent, IonModal, IonTextarea, IonItem, modalController } from '@ionic/vue';
import { ref } from 'vue';
import apiPost from '@/logic/API/apiPost';

const props = defineProps<{
    userId: number
    postId: number
    description: string
}>()

let text = ref(props.description)

async function save() {
    await apiPost('updatePost', props.postId, props.userId, text.value)
    modalController.dismiss('post-edit' + props.postId)
}
</script>

<template>
    <div>
        <IonItem :id="'post-edit' + props.postId" :button="true" :detail="false" lines="full">Edit post</IonItem>
        <IonModal type="modal" :trigger="'post-edit' + props.postId" :initial-breakpoint="0.6" :breakpoints="[0.6, 1]">
            <h1>Edit post</h1>
            <IonContent>
                <IonTextarea label="Description" label-placement="floating" :counter="true" :maxlength="500"
                    :auto-grow="true" :value="text" @input="text = $event.target.value"></IonTextarea>
                <IonButton expand="full" @click="save()">save</IonButton>
            </IonContent>
        </IonModal>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    margin: 30px auto 10px auto;
}

ion-content {
    --margin: 10px 0px 10px 10px !important;
    height: fit-content;
    font-size: large;

}

ion-button {
    --background: rgba(0, 0, 0, 0);
    --background-hover: #ffffff33;
    --background-activated: #ffffff33;
    --color: #fff000;
    --padding-top: 10px;
    --padding-bottom: 10px;
}

#user-menu {
    height: 60px;
    position: absolute;
    right: 10px;
}

img {
    height: 50%;
    margin: 10px 20px;
    vertical-align: middle;

}
</style>