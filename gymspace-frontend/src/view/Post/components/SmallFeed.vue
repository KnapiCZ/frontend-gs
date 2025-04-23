<script setup lang="ts">
import { userDataStore } from "@/stores/UserDataStore"
import Thumbnail from "./Thumbnail.vue"
import { onMounted, ref } from "vue"
import apiPost from "@/logic/API/apiPost"
import router from "@/router"

const posts = ref([])

const props = defineProps<{
    userId: number
}>()

const loadPosts = async () => {
    await apiPost("usersPosts", props.userId).then((response) => {
        console.log(response)
        if (response.status == "success") {
            posts.value = response.data
        }
    })
}

onMounted(async () => {
    loadPosts()
})
</script>

<template>
    <div class="grid-container">
        <Thumbnail v-for="post in posts" :postID="post" :path="'/user/' + 3 + '/post/' + post" class="grid-item" />
    </div>
</template>

<style scoped>
.grid-container {
    display: grid;
    width: 100%;
    grid-template-columns: 33% 33% 33%;
    margin: 0;
}

.grid-item {
    text-align: center;
    aspect-ratio: 1/1.5;
    object-fit: cover;
    width: fit-content;
    margin: 1px;
}
</style>
