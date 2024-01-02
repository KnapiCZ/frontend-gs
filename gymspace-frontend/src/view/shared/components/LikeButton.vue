<script setup lang="ts">
import { ref } from 'vue';
import apiUser from '@/logic/API/apiUser'

const props = defineProps<{
    userId: number
    postId: number
}>()


const isLiked = ref()
const x = await apiUser("postLiked", props.userId, props.postId)

if (x.liked === 'true') { isLiked.value = true }
else { isLiked.value = false }


async function likeIt() {
    isLiked.value = !isLiked.value
    await apiUser("likePost", props.userId, props.postId)
}

</script>

<template>
    <button @click="likeIt()">
        <img :class="{ like: isLiked }" src="@/assets/icons/like.svg">
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