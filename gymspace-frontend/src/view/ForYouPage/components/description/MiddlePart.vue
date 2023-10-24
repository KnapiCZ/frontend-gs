<script setup lang="ts">
const props = defineProps<{
    description?: string,
    hashtags?: string
}>()



</script>


<template>
    <p class="main-text">{{ description }}</p>
    <p class="hashtags">{{ hashtags }}</p>
    <p class="liked-text">Post was also liked by @gymshark and 81 others</p>
</template>



<style scoped>
p {
    margin-top: 10px;
    margin-left: calc(8vw + 23px);
    margin-right: 30px;
    color: white;
    font-size: 13px;
}

.main-text {
    font-weight: bold;
}

.hashtags,
.liked-text {
    margin-top: 3px;
    font-size: 12px;
    color: rgb(153, 153, 153);
}
</style>