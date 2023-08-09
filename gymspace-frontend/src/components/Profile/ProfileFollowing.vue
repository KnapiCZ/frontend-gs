<script setup>
    import { VCol } from 'vuetify/lib/components/index.mjs';
    import { VRow } from 'vuetify/lib/components/index.mjs';
</script>


<template>
    <VCol>
        <VRow class="block">
            <img src="../../assets/icons/club.png" alt="clubICO">
            <p>@nejkejuser</p>
        </VRow>
        <VRow class="block">
            <img src="../../assets/icons/feed.png" alt="feedICO">
            <p>@nejkejuser</p>
        </VRow>
    </VCol>
</template>

<style scoped>

.block img
{
    width: 20px;
    margin-right: 4px;
}
.block {
    margin-bottom: 5px;
    margin-left: 10px;
}

</style>