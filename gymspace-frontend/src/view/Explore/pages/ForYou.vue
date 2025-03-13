<script setup lang="ts">
import { IonPage } from "@ionic/vue"

import PostSlider from "./../../Post/pages/PostSlider.vue"
</script>

<template>
    <IonPage>
        <PostSlider :keyStart="0" :transition="false" :reverse-transition="false" />
    </IonPage>
</template>
