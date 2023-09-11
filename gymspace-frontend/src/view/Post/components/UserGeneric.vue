<script setup>
import DescriptionFYP from './DescriptionFYP.vue';
import api from '@api';

const props = defineProps({
    type: String,
    sourcePost: String
})

</script>

<template>
    <div id="MainContainer">
        <video
            v-if="props.type == 'video'"
            :src="props.sourcePost" >
        </video>
        <img 
            v-if="'img' == 'img'"
            :src="props.sourcePost">
        <DescriptionFYP />
    </div>

</template>

<style scoped>
#MainContainer{
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;

}
img,
video{
    width: 100%;
    height: fit-content;

}

</style>