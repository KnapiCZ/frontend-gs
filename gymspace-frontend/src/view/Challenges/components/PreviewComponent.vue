<script setup lang="ts">
import { ref } from "vue"
import image from "../../../assets/icons/Points.svg"
import PointsComponent from "@/view/shared/components/PointsComponent.vue"

const progress = ref({
    day: 0,
    points: 0,
    time_workout: 0,
})
</script>

<template>
    <div class="latest-day row">
        <div class="overlap column">
            <h6 class="text-wrapper">DAY {{ progress.day }}</h6>
            <PointsComponent :points="progress.points" />
        </div>
        <div class="frame">
            <div class="row border-gradient">
                <div class="column">
                    <h6>Worked Out For</h6>
                    <p class="text-smallest">{{ progress.time_workout }} Minutes</p>
                </div>
                <img class="vector" alt="Vector" :src="image" />
            </div>
            <div class="row border-gradient bottom">
                <div class="column">
                    <h6>Worked Out For</h6>
                    <p class="text-smallest">{{ progress.time_workout }} Minutes</p>
                </div>
                <img class="vector" alt="Vector" :src="image" />
            </div>
        </div>
    </div>
</template>

<style>
.latest-day {
    height: 124px;
    padding: 16px;
    margin: 0 8px;
    background-color: rgba(26, 26, 20, 0.8);
    border-radius: 6px;
    gap: 16px;
}

.text-wrapper {
    margin-left: 8px;
    margin-top: 8px;
}

.overlap {
    height: 100%;
    aspect-ratio: 1;
    background-position: 50% 50%;
    background-color: brown;
    background-size: cover;
    background-image: url("../../../assets/images/Bodybuilding.png");
    position: relative;
    border-radius: 6px;
}

.overlap.column {
    justify-content: space-between;
    align-items: start;
}

.frame {
    width: 100%;
}

.frame > .row {
    padding: 16px;
    position: relative;
    height: 26px;
}

.frame > .bottom {
    margin-top: 8px;
}

.frame .column {
    width: 100%;
    align-items: start;
}
</style>
