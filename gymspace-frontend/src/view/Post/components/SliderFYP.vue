<script setup>
const props = defineProps(['type', 'source'])
import DescriptionFYP from './DescriptionFYP.vue';
</script>

<template>
    
    <div id="MainContainer">
        <video
            v-if="props.type == 'video'"
            :src="props.source" >
        </video>
        <img 
            v-if="props.type == 'img'"
            :src="props.source">
        <DescriptionFYP />
    </div>

</template>

<style scoped>
#MainContainer{
    position: relative;
    width: 100%;
    height: 85vh;
    background-color: black;
    scroll-snap-align: start;


}
img,
video{
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: auto;
}

</style>