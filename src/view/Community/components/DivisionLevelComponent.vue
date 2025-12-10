<script setup lang="ts">
import { onMounted, computed } from "vue"
import { updateDivisionColor } from "@/logic/utils/common"
import PointsComponent from "@/view/shared/components/PointsComponent.vue"
const props = defineProps<{
    level: number
    currentXP: number
    nextLevelXP: number
    divisionPoints: number
    sport: string
}>()

const progressPercentage = computed(() => (props.currentXP! / props.nextLevelXP!) * 100)
// Set the initial color when component loads
onMounted(() => {
    updateDivisionColor(props.sport)
})
</script>

<template>
    <div class="level-container row">
        <div class="level-left row">
            <p class="level-text">LV</p>
            <div class="level-circle box">
                <h4>{{ level }}</h4>
            </div>
            <div class="level-bar">
                <div class="progress-container">
                    <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
                    <div class="ticks row">
                        <div v-for="(tick, index) in 50" :key="tick" id="tick" :class="{ long: index % 5 == 0 }"></div>
                    </div>
                </div>
                <div class="next-level-text">
                    <span>NXT LV {{ nextLevelXP }}</span>
                </div>
            </div>
        </div>

        <PointsComponent :points="props.currentXP" />
    </div>
</template>

<style scoped>
.level-container {
    width: auto;
    margin: 16px;
}

.level-left {
    gap: 10px;
    width: 64%;
}

.level-text {
    margin-bottom: 30px;
    font-size: 10px;
}

.level-container.row {
    justify-content: space-between;
}

.level-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: black;
    box-shadow: 0 0 10px 5px var(--division-color);
    z-index: 10;
}

.level-bar {
    width: 70%;
    margin-left: -16px;
    margin-top: 20px;
}

.progress-container {
    height: 8px;
    background: rgba(0, 0, 0, 1);
    border: 1px solid white;
    border-radius: 2px;
    position: relative;
}

.progress-bar {
    height: 100%;
    background: var(--division-color);
    transition: width 0.5s ease-in-out;
    box-shadow: 0 0 10px 3px var(--division-color);
}

.ticks {
    position: absolute;
    align-items: end;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

#tick {
    width: 1px;
    height: 50%;
    background: white;
    opacity: 0.5;
}

.long {
    height: 70%;
}

.next-level-text {
    font-size: 12px;
    text-align: right;
}
</style>