<script setup lang="ts">
const props = defineProps({
    social: []
})
</script>

<template>
    <div>
        <a v-if="props.social![0] != ''" :href="props.social![0]" target="_blank">
            <img src="../../../../assets/icons/instagram.svg" alt="instagram">
        </a>
        <a v-if="props.social![1] != ''" :href="props.social![1]" target="_blank">
            <img src="../../../../assets/icons/youtube.svg" alt="youtube">
        </a>
    </div>
</template>


<style scoped>
div {
    width: 100%;
    height: 8%;
    text-align: center;
}

a {
    height: 100%;
    aspect-ratio: 1;
    display: inline-block;
    margin: auto 10px;
}

img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
}
</style>