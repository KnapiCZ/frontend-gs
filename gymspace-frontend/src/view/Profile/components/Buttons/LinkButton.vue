<script setup lang="ts">
import { VBtn } from 'vuetify/lib/components/index.mjs';


const props = defineProps({
    type: String,
    link: String,
    name: String,
})

</script>

<template>
    <VBtn>
        <img v-if="props.type === 'email'" src="../../../../assets/icons/envelope.svg" alt="email">
        <img v-if="props.type === 'web'" src="../../../../assets/icons/globe.svg" alt="web">
        <img v-if="props.type === 'nwm'" src="../../../../assets/icons/envelope.svg" alt="other">
        <p>{{ props.name }}</p>
    </VBtn>
</template>

<style scoped>
.v-btn {
    width: auto;
    height: 60px;
    margin: 10px 30px;
    border-radius: 10px;
    background-color: #2C2C2C;
    color: white;
}

img {
    position: absolute;
    left: 10px;
    margin: auto;
}

p {
    font-weight: bold !important;

}
</style>