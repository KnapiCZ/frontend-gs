<script setup lang="ts">
import { IonPage } from '@ionic/vue';

import Slider from '../components/Slider.vue';

</script>

<template>
    <IonPage>
        <Slider :keyStart="0" :transition="false" :reverse-transition="false" />
    </IonPage>
</template>


<script lang="ts">
export default {
    data: () => ({
        tab: null
    }),
}
</script>

<style scoped>
.v-window-item--active {
    height: calc(100vh - 52px);
    overflow: hidden;
}

.v-tabs {
    position: absolute !important;
    background-color: transparent;
    color: white;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 5;
}
</style>