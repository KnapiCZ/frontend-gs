<script setup lang="ts">
import { ref } from "vue"
import apiPost from "@/logic/API/apiPost"
import { userDataStore } from "@/stores/UserDataStore"

const props = defineProps<{
    userId: number
    postId: number
}>()

const userStore = userDataStore()
const isLiked = ref()
const opacity = ref(0)
const outline = ref("#f")
// TODO: prepsat props.userId na logged_user, protoze tohle kontroluje zda logged_user liknul post a nedava to smysl
//isLiked.value = await apiPost("postLiked", props.postId, undefined, userStore.loggedUserId.toString())
console.log(isLiked.value.liked)

if (isLiked.value.liked) {
    opacity.value = 1
    outline.value = "#fff000"
} else {
    opacity.value = 0
    outline.value = "#132546"
}

//posle do databaze zadost o zmenu stavu liknuti
const likeIt = async() => {
    isLiked.value.liked = !isLiked.value.liked
    if (isLiked.value.liked) {
        opacity.value = 1
        outline.value = "#fff000"
    } else {
        opacity.value = 0
        outline.value = "#ffffff"
    }

    //console.debug(await apiPost("updateLike", props.postId, undefined, userStore.loggedUserId.toString()))
}
</script>

<template>
    <button @click="likeIt()">
        <svg id="heart-icon">
            <use
                class="heart-icon"
                href="../../../assets/icons/like.svg#heart"
                :fill-opacity="opacity"
                fill="#fff000"
            />
        </svg>
    </button>
</template>

<style scoped>
.heart-icon {
    fill: #fff000 !important;
    /* Override fill */
    stroke: red !important;
    /* Override stroke */
}

button {
    width: 32px;
    height: 32px;
}

svg {
    width: 100% !important;
    height: 100% !important;
}

button:focus,
svg:focus {
    animation: liking 0.5s ease-in-out;
    -webkit-animation: liking 0.5s ease-in-out;
}

button:active,
svg:active {
    -webkit-animation: none;
    animation: none;
}

@keyframes liking {
    from {
        transform: scale(1);
    }

    25% {
        transform: scale(0.95);
    }

    50% {
        transform: scale(1.1);
    }

    75% {
        transform: scale(0.95);
    }

    to {
        transform: scale(1);
    }
}
</style>
