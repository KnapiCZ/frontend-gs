<script setup>
import HeadPart from './description/HeadPart.vue';
import MiddlePart from './description/MiddlePart.vue'
import MusicPart from './description/MusicPart.vue';

</script>


<template>
    <VContainer class="description">
        <HeadPart />
        <MiddlePart />
        <MusicPart />
    </VContainer>
</template>

<style scoped>



.description{
    max-width: 99%;
    height: 14vh;
    background-color: rgba(50,50,50,0.5);
    position: absolute;
    bottom: 56px;
    left: 0;
    overflow: hidden;
}
</style>