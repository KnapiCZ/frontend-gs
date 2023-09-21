<script setup>
import { VRow } from 'vuetify/lib/components/index.mjs';

</script>

<template>
    <VRow>
        <img src="../../../../assets/icons/note.svg" alt="note icon">
        <p>HARDSTYLE REMIX - WARRIORS...</p>
    </VRow>

</template>

<style scoped>
.v-row{
    margin-top: 10px;
    margin-left: calc(8vw + 23px);
    margin-right: 30px;
}

p{
    font-weight: bold;
    color: white;
    font-size: 13px;
}

img{
    margin: auto 10px auto 0;
    height: 13px;
}
.hashtags,
.liked-text{
    margin-top: 3px;
    font-size: 12px;
    color: rgb(153, 153, 153);
}
</style>