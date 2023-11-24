<script setup lang="ts">
import LikeButton from '@/view/shared/components/LikeButton.vue';


</script>

<template>
    <div>
        <LikeButton class="items" :postId="1" :userId="1" />
        <img class="items" src="@/assets/icons/share.svg" alt="share">
        <img class="items" src="@/assets/icons/comments.svg" alt="comments">
        <img class="items" src="@/assets/icons/menu.svg" alt="menu">
    </div>
</template>

<style scoped>
.items {
    width: 30px;
    height: 30px;
    margin: 15px;
    display: block;
}

div {
    height: fit-content;
    width: fit-content;
    position: absolute;
    right: 0;
    bottom: 250px;
}
</style>