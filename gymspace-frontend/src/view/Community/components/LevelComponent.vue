<script setup>
  import { computed } from "vue";

  const props = defineProps({
    level: Number,
    currentXP: Number,
    nextLevelXP: Number,
    gymPoints: Number,
  });

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
              <div v-for="tick in 20" :key="tick" class="tick"></div>
            </div>
          </div>
          <div class="next-level-text">
            <span>NXT LV {{ nextLevelXP.toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <div class="gym-points">
        <span class="points">{{ gymPoints.toLocaleString() }}</span>
        <img src="@/assets/icons/Points.svg" alt="Points" class="gym-icon" />
      </div>
    </div>
</template>

<style scoped>
  .level-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 20px 20px;
    margin-bottom: -55px;
  }

  .level-left {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .level-text {
    margin-bottom: 40px;
    font-size: 12px;
    color: white;
  }

  .level-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: black;
    color: white;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px 5px yellow;
  }

  .level-bar {
    width: 60%;
    margin-left: -10px;
    margin-top: 20px;
  }

  .progress-container {
    height: 10px;
    background: rgba(0, 0, 0, 1);
    border: 1px solid white;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: yellow;
    transition: width 0.5s ease-in-out;
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

  .tick {
    width: 1px;
    height: 100%;
    background: white;
    opacity: 0.5;
  }

  .next-level-text {
    font-size: 12px;
    color: white;
    text-align: right;
  }

  .gym-points {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 8px 12px;
    border-radius: 8px;
    white-space: nowrap;
    margin-right: 40px;
  }

  .points {
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin-right: 5px;
  }

  .gym-icon {
    width: 25px;
    height: 25px;
  }
</style>
