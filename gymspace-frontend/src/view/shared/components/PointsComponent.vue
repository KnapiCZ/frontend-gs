<script setup lang="ts">

const props = defineProps<{
    points: number
}>()

</script>

<template>
    <div class="points-wrapper">
        <span class="points">{{ points }}</span>
        <img src="@/assets/icons/Points.svg" alt="Points" class="points-icon" />
    </div>
</template>

<style scoped>
.points-wrapper {
    width: 96px;
    height: 32px;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    margin-right: 40px;
}

.points {
    font-size: 14px;
    font-weight: bold;
    color: white;
    margin: auto;
}

.points-icon {
    width: 20px;
    height: 20px;
    margin: auto;
}
</style>