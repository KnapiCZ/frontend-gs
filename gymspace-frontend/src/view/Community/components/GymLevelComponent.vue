<script setup>
import PointsComponent from "@/view/shared/components/PointsComponent.vue";
import { computed } from "vue";

const props = defineProps({
  level: Number,
  currentXP: Number,
  nextLevelXP: Number,
  gymPoints: Number,
});

console.log(props.level, props.currentXP, props.nextLevelXP, props.gymPoints)
const progressPercentage = computed(() => (props.currentXP / props.nextLevelXP) * 100);
</script>

<template>
  <div class="level-container">
    <div class="level-left">
      <p class="level-text">LV</p>
      <div class="level-circle">
        <span>{{ level }}</span>
      </div>
      <div class="level-bar">
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
          <div class="ticks">
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
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin-bottom: -55px;
}

.level-left {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 64%;
}

.level-text {
  margin-bottom: 30px;
  font-size: 10px;
  color: white;
}

.level-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: black;
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px 5px yellow;
  z-index: 10;
}

.level-bar {
  width: 70%;
  margin-left: -12px;
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
  background: yellow;
  transition: width 0.5s ease-in-out;
  box-shadow: 0 0 10px 3px yellow;
}

.ticks {
  display: flex;
  justify-content: space-between;
  position: absolute;
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
  height: 90% !important;
}

.next-level-text {
  font-size: 12px;
  color: white;
  text-align: right;
}
</style>
