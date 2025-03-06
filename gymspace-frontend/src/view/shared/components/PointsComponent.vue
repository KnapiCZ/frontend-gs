<script setup lang="ts">

defineProps<{
    points: number
}>()

</script>

<template>
    <div class="points-wrapper row">
        <h5>{{ points }}</h5>
        <img src="@/assets/icons/Points.svg" alt="Points"/>
    </div>
</template>

<style scoped>
.points-wrapper {
    width: 96px;
    height: 32px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
}
</style>