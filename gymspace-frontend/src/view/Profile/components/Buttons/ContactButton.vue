<script setup lang="ts">
import { VCard, VDialog } from 'vuetify/lib/components/index.mjs';
import SocialMedia from './SocialMedia.vue';
import LinkButton from "./LinkButton.vue";


</script>

<template>
    <button>
        Contact
        <VDialog activator="parent" :persistent="false" transition="dialog-bottom-transition" :scrollable="true"
            width="75vw" height="70vh">
            <VCard>
                <p>CONTACT</p>

                <LinkButton type="email" link="blablabla" name="Email" />
                <LinkButton type="web" link="gymspace.cz" name="Gymspace.cz" />



                <SocialMedia class="social" />
            </VCard>
        </VDialog>
    </button>
</template>

<style scoped>
.v-card {
    margin: auto;
    width: 75vw;
    height: 70vh;
    border-radius: 20px !important;
    text-align: center;
    background-color: rgba(14, 14, 14, 0.815);
    color: white;
    backdrop-filter: blur(8px);
}

p {
    font-size: 28px;
    font-weight: bold;
    margin: 20px auto
}

button {
    display: inline-block;
    padding: 5px auto;
    margin: 10px 10px;
    width: 25%;
    height: 30px;
    background-color: rgb(47, 47, 47);
    font-weight: bold;
    border-radius: 5px;
}

.social {
    width: 100%;
    position: absolute;
    bottom: 30px;



}
</style>