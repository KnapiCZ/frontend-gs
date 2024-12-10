<script setup lang="ts">
import { ref } from 'vue';
import apiPost from '@/logic/API/apiPost'

const props = defineProps<{
    userId: number
    postId: number
}>()


const isLiked = ref()
// TODO: prepsat props.userId na logged_user, protoze tohle kontroluje zda logged_user liknul post a nedava to smysl
isLiked.value = await apiPost("postLiked", props.postId, undefined, (props.userId as unknown as string))
console.log(isLiked.value.liked)
//if (x.liked === true) { isLiked.value = true }
//else { isLiked.value = false }

//posle do databaze zadost o zmenu stavu liknuti
async function likeIt() {
    isLiked.value.liked = !isLiked.value.liked
    console.debug(await apiPost("updateLike", props.postId, undefined, (props.userId as unknown as string)))
}

</script>

<template>
    <button @click="likeIt()">
        <img :class="{ like: isLiked.liked }" src="@/assets/icons/like.svg">
    </button>
</template>

<style scoped>
img {
    height: 28px;
}

button:focus,
img:focus {
    animation: liking 0.5s ease-in-out;
    -webkit-animation: liking 0.5s ease-in-out;
}

button:active,
img:active {
    -webkit-animation: none;
    animation: none;
}

.like {
    filter: brightness(0) saturate(100%) invert(77%) sepia(97%) saturate(487%) hue-rotate(359deg) brightness(104%) contrast(101%)
}

@keyframes liking {
    from {
        transform: scale(1)
    }

    25% {
        transform: scale(0.95)
    }

    50% {
        transform: scale(1.1)
    }

    75% {
        transform: scale(0.95)
    }

    to {
        transform: scale(1)
    }
}

@-webkit-keyframes liking {
    from {
        transform: scale(1)
    }

    25% {
        transform: scale(0.95)
    }

    50% {
        transform: scale(1.1)
    }

    75% {
        transform: scale(0.95)
    }

    to {
        transform: scale(1)
    }
}
</style>