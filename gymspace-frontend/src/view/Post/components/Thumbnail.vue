<script setup lang="ts">
import apiPost from "@/logic/API/apiPost"
import { IonButton, useIonRouter } from "@ionic/vue"
import { onMounted, ref } from "vue"

const router = useIonRouter()

const props = defineProps<{
    postID?: number
    path: string // typ = kde se thumbnail nachazi profil -> bude routovat na profil/x/post/, community -> bude routovat na community/explore
}>()

const media = ref("")
console.log(media)

function setRouting() {
    router.push(props.path)
}
const loadPost = async () => {
    await apiPost("getPost", props.postID).then((response) => {
        console.log(response)
        if (response.status == "success") {
            media.value = response.data.media[0]
        }
    })
}

// TODO: az budou posty jen videa tak smazat tag img a odkomentarovat video tag

onMounted(() => {
    loadPost()
})
</script>

<template>
    <IonButton class="ion-no-padding" color="transparent" @click="setRouting()">
        <img :src="media" alt="post thumbnail" class="thumbnail" />
        <!--	<video:src="postUrl" alt="post thumbnail" class="thumbnail"></video>	-->
    </IonButton>
</template>

<style scoped>
img,
video {
    width: 100%;
    aspect-ratio: 1/1.5;
    object-fit: cover;
    border-radius: 10px;
}

video {
    pointer-events: none;
}
</style>
