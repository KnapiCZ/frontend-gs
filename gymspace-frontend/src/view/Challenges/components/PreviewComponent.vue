<script setup lang="ts">
import { ref } from "vue"
import image from "../../../assets/icons/Points.svg"
import points from "../../../assets/icons/Points.svg"
import vector from "../../../assets/icons/Points.svg"

const progress = ref({
    day: 0,
    points: 0,
    time_workout: 0,
})

</script>

<template>
    <div class="latest-day">
        <div class="overlap border-gradient">
            <div class="text-wrapper">DAY {{ progress.day }}</div>
            <div class="points-for-day">
                <div class="overlap-group">
                    <div class="div">{{ progress.points }}</div>
                    <img class="points" alt="Points" :src="points" />
                </div>
            </div>
        </div>
        <div class="frame">
            <div class="worked-out-for border-gradient">
                <div class="frame-2">
                    <div class="text-wrapper-2">Worked Out For</div>
                    <div class="frame-3">
                        <div class="text-wrapper-3">{{ progress.time_workout }}</div>
                        <div class="text-wrapper-4">Minutes</div>
                    </div>
                </div>
                <img class="vector" alt="Vector" :src="image" />
            </div>
            <div class="worked-out-for border-gradient">
                <div class="frame-2">
                    <div class="text-wrapper-2">Calories Burnt</div>
                    <div class="frame-3">
                        <div class="text-wrapper-5">{{ progress.time_workout }}</div>
                        <div class="text-wrapper-4">Kcal</div>
                    </div>
                </div>
                <img class="img" alt="Vector" :src="vector" />
            </div>
        </div>
    </div>
</template>


<style>
.latest-day {
    align-items: center;
    background-color: #1A1A14;
    border: 1px solid;
    border-color: transparent;
    border-radius: 6px;
    display: flex;
    gap: 16px;
    padding: 16px;
    position: relative;
    width: 373px;
}

.latest-day .overlap {
    width: 133px;
    height: 124px;
    background-position: 50% 50%;
    background-color: brown;
    background-size: cover;
    background-image: url('../../../assets/images/Bodybuilding.png');
    position: relative;
    border-radius: 6px;
}

.latest-day .text-wrapper {
    color: #ffffff;
    font-family: "Montserrat-Bold", Helvetica;
    font-size: 16px;
    font-weight: 700;
    left: 7px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 3px;
    width: 64px;
}

.latest-day .points-for-day {
    height: 29px;
    left: 0;
    position: absolute;
    top: 95px;
    width: 102px;
}

.latest-day .overlap-group {
    background: linear-gradient(180deg, rgb(47, 47, 47) 0%, rgb(28, 28, 28) 100%);
    border-radius: 0 6px 0 6px;
    height: 29px;
    position: relative;
    width: 100px;
}

.latest-day .div {
    color: #ffffff;
    font-family: "Montserrat-Black", Helvetica;
    font-size: 12px;
    font-weight: 900;
    height: 8px;
    left: 13px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 11px;
    white-space: nowrap;
    width: 38px;
}

.latest-day .points {
    height: 17px;
    left: 70px;
    position: absolute;
    top: 6px;
    width: 17px;
}

.latest-day .frame {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    flex: 1;
    flex-direction: column;
    flex-grow: 1;
    gap: 8px;
    justify-content: center;
    position: relative;
}

.latest-day .worked-out-for {
    -webkit-backdrop-filter: blur(26.6px) brightness(100%);
    align-items: center;
    align-self: stretch;
    backdrop-filter: blur(26.6px) brightness(100%);
    background-color: #1a1913cc;
    border-radius: 6px;
    box-shadow: -4px 4px 19.9px 1px #0000009e;
    display: flex;
    flex: 0 0 auto;
    padding: 8px 16px;
    position: relative;
    width: 100%;
}

.latest-day .frame-2 {
    align-items: flex-start;
    display: flex;
    flex: 1;
    flex-direction: column;
    flex-grow: 1;
    gap: 4px;
    justify-content: center;
    padding: 8px 0;
    position: relative;
}

.latest-day .text-wrapper-2 {
    align-self: stretch;
    color: #ffffff;
    height: 8px;
    margin-top: -1.00px;
    position: relative;
    white-space: nowrap;
}

.latest-day .frame-3 {
    align-items: flex-end;
    display: flex;
    flex: 0 0 auto;
    gap: 4px;
    position: relative;
    width: 97.35px;
}

.latest-day .text-wrapper-3 {
    color: #ffffff;
    font-family: "Montserrat-Bold", Helvetica;
    font-size: 14px;
    font-weight: 700;
    height: 14px;
    letter-spacing: 0;
    line-height: normal;
    margin-top: -1.00px;
    position: relative;
    white-space: nowrap;
    width: 17px;
}

.latest-day .text-wrapper-4 {
    color: #ffffff;
    height: 13px;
    position: relative;
    white-space: nowrap;
    width: 45px;
}

.latest-day .vector {
    height: 24px;
    position: relative;
    width: 18px;
}

.latest-day .text-wrapper-5 {
    color: #ffffff;
    font-family: "Montserrat-Bold", Helvetica;
    font-size: 14px;
    font-weight: 700;
    height: 14px;
    letter-spacing: 0;
    line-height: normal;
    margin-top: -1.00px;
    position: relative;
    white-space: nowrap;
    width: 24px;
}

.latest-day .img {
    height: 24px;
    position: relative;
    width: 21px;
}
</style>