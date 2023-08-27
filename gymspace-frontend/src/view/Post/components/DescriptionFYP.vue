<script setup>
    import { VCol } from 'vuetify/lib/components/index.mjs';
    import { VRow  } from 'vuetify/lib/components/index.mjs';
    import { VAvatar } from 'vuetify/lib/components/index.mjs';
</script>


<template>
    <div class="description">
        <VRow>
            <VAvatar color="yellow" /> <!-- API PFP of  post owner -->
        </VRow>
    </div>
</template>

<style scoped>
*{
    width: 100%;
}

.description{
    width: 100%;
    height: 18%;
    background-color: aqua;
    position: absolute;
    bottom: 0;
}

.v-avatar{
    position: relative;
}

</style>