<script setup lang="ts">
import ChallengeThumbGrid from '@/view/Challenges/pages/ChallengeThumbGrid.vue';
import DivisionCommunityButton from '../Division/DivisionCommunityButton.vue';
import apiDivision from '@/logic/API/apiDivision';


const props = defineProps<{
    gymId: number
}>()

let divisions = await apiDivision("gymDivisions", props.gymId)
let isActive = false

function toggle() {
    if (!isActive) {
        isActive = true
        document.getElementById("arrow")!.style.rotate = "270deg";
        document.getElementById("extend")!.style.height = 71.3 + "vw";
    }
    else {
        isActive = false
        document.getElementById("arrow")!.style.rotate = "90deg"
        document.getElementById("extend")!.style.height = 35.5 + "vw";
    }
}

</script>

<template>
    <H2>Divisons</H2>
    <div class="grid-division-container extend" id="extend">
        <DivisionCommunityButton v-for="division in divisions" :id="division" divisionType="small"
            class="grid-division-item" />
    </div>
    <button v-if="divisions.length > 4" @click="toggle()"><img id="arrow"
            src='../../../../assets/icons/arrowRight.svg'></button>
    <H2>Challenges</H2>
    <ChallengeThumbGrid :type="1" />
</template>

<style scoped>
.grid-division-container {
    display: grid;
    width: 100%;
    grid-template-columns: 25% 25% 25% 25%;
}

.grid-division-item {
    text-align: center;
    object-fit: cover;
    width: fit-content;
}

#extend {
    width: auto;
    height: 35.5vw;
    overflow: hidden;
    text-align: center;
    transition: height 0.2s cubic-bezier(0.19, 1, 0.22, 1);
}

#arrow {
    rotate: 90deg;
}

H2 {
    margin: 10px 0;
    border-top: 1px white solid;
}

button {
    width: 90%;
    margin: 20px;
}
</style>
