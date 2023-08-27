<script setup>
import DescriptionFYP from './DescriptionFYP.vue';

const props = defineProps({
    type: 'img',
})

</script>

<template>
    <div id="MainContainer">
        <video
            v-if="props.type == 'video'"
            :src="$route.params.source" >
        </video>
        <img 
            v-if="'img' == 'img'"
            :src="$route.params.source">
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
    margin: auto;
}

</style>