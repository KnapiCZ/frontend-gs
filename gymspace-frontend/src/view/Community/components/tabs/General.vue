<script setup lang="ts">
import ChallengeThumbGrid from '@/view/Challenges/pages/ChallengeThumbGrid.vue';
import CommunityButton from '../CommunityButton.vue';
import apiGymDiv from '@/logic/API/apiGymDiv';

const props = defineProps<{
    gymId: number
}>()

let divisions = await apiGymDiv("gymDivisions", 'gym', props.gymId)
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
        document.getElementById("extend")!.style.height = 37 + "vw";
    }
}

</script>

<template>
    <h2>Divisons</h2>
    <div class="grid-division-container extend" id="extend">
        <CommunityButton v-for="division in divisions" type="division" :id="division" divisionType="small"
            class="grid-division-item" />
    </div>
    <button v-if="divisions.length > 4" @click="toggle()"><img id="arrow"
            src='../../../../assets/icons/arrowRight.svg'></button>
    <h2>Challenges</h2>
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
    height: 18vh;
    overflow: hidden;
    text-align: center;
    transition: height 0.2s cubic-bezier(0.19, 1, 0.22, 1);
}

#arrow {
    rotate: 90deg;
}

h2 {
    margin: 10px 0;
    border-top: 1px white solid;
}

button {
    width: 90%;
    margin: 20px;
}
</style>
