<script setup lang="ts">
defineProps<{
    points: number
}>()
</script>

<template>
    <div class="points-wrapper row">
        <h5>{{ points }}</h5>
        <img src="@/assets/icons/Points.svg" alt="Points" />
    </div>
</template>

<style scoped>
.points-wrapper {
    width: 96px;
    height: 32px;
    border: 1px solid rgba(255, 255, 255, 0.46);
    background: linear-gradient(90deg, #2f2f2f -3.59%, #1c1c1c 106.66%);
    border-radius: 6px;
}

img {
    filter: drop-shadow(0 0 1.526px rgba(255, 255, 0, 0.5)) drop-shadow(0 0 3.051px rgba(255, 255, 0, 0.5))
        drop-shadow(0 0 10.68px rgba(255, 255, 0, 0.5)) drop-shadow(0 0 21.359px rgba(255, 255, 0, 0.5))
        drop-shadow(0 0 36.616px rgba(255, 255, 0, 0.5)) drop-shadow(0 0 64.078px #ff0);
}
</style>
