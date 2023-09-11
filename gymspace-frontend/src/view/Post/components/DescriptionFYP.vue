<script setup>
    import { VCol } from 'vuetify/lib/components/index.mjs';
    import { VRow  } from 'vuetify/lib/components/index.mjs';
    import { VAvatar } from 'vuetify/lib/components/index.mjs';
    import { VContainer } from 'vuetify/lib/components/index.mjs';
    const props = defineProps({
        userHandle: "String"
    })

</script>


<template>
    <VContainer class="description">
        <VRow class="VRow">
           <VAvatar class="pfp" color="yellow" /> <!-- API PFP of  post owner -->
                <p class="userName">@Gymspace_athletes</p>
                <button>Follow</button>
        </VRow>
    </VContainer>
</template>

<style scoped>



.description{
    width: 100%;
    height: 18%;
    background-color: rgba(50,50,50,0.5);
    position: absolute;
    bottom: 56px;
    left: 0;
}

.VRow{
    padding: 5px;
}




button{
    height: 20px;
    width: 20%;
    background-color: white;
    margin: 5px;
    border-radius: 5px;
}

.userName{
    font-weight: bold;
    color: white;
}



</style>