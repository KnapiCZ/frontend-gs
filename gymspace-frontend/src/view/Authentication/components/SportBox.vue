<script setup lang="ts">
import { ref } from 'vue';
import { userDataStore } from '@/stores/UserDataStore';
import { useIonRouter } from '@ionic/vue';

const router = useIonRouter();
const userStore = userDataStore()
const props = defineProps<{
    title: string,
    description: string,
    imageSrc: string,
    sport_id: number
}>();


const toggleGlow = () => {
    userStore.addToDict("sports", [props.sport_id])
    router.push('/step-5')

}
</script>


<template>
    <div class="card" @click="toggleGlow">
        <div class="image-container">
            <img :src="imageSrc" alt="" class="image" />
        </div>
        <div class="text-container">
            <h3>{{ title }}</h3>
            <p>{{ description }}</p>
        </div>
    </div>
</template>



<style scoped>
.card {
    position: relative;
    width: 100%;
    height: 16vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-top: 3vh;
}

.image-container {
    position: absolute;
    top: -40%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    z-index: 0;
    /* Push image behind text */
}

.image {
    width: 100%;
    height: auto;
}

.text-container {
    background: transparent;
    border: solid white 1px;
    color: white;
    padding: 10px;
    border-radius: 10px;
    text-align: left;
    z-index: 2;
    backdrop-filter: blur(10px);
    aspect-ratio: 164/80;
    transition: box-shadow 0.3s ease;
}
</style>
