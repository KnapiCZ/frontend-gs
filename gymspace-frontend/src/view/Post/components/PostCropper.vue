<script setup lang="ts">
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
import { usePhotoGallery, UserPhoto } from '@/plugins/usePhotoGallery';
import { ref } from 'vue';
const { photos, takePhoto } = usePhotoGallery();

const props = defineProps<{
    ratios: []
}>()

let count = ref(0)

</script>

<template>
    <div class="wrapper">
        <Cropper :key="'cropper' + count" classname="image-cropper" boundingBoxClass="bounding-box-class"
            imageClass="cropper-image" backgroundClass="cropper-background" image-restriction="stencil"
            @change="onChange" :src="userStore.choosenPhoto" :stencil-props="{
                previewClass: 'preview',
                handlers: {},
                movable: false,
                resizable: false,
                aspectRatio: props.ratios[count % 2][0] / props.ratios[count % 2][1],
            }" :resize-image="{
                adjustStencil: false,
            }" />
            <div class="control-panel">
                <button v-if="props.ratios.length > 1" @click="() => count++">
                    {{ props.ratios[count % 2][0] + '/' + props.ratios[count % 2][1] }}
                </button>
                                
                <button @click="takePhoto()" class="camera-button">
                    <img src="@/assets/icons/camera.svg" alt="Camera" />
                </button>
            </div>

    </div>
</template>
<script lang="ts">
import { userDataStore } from '@/stores/UserDataStore';

let userStore = userDataStore()

export default {

    components: {
        Cropper,
    },
    data() {
        return {
            coordinates: {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            },
        };
    },
    methods: {
        onChange({ coordinates, canvas, }) {
            this.coordinates = coordinates;
            userStore.croppedChoosenPhoto = canvas.toDataURL();
        },
    },
};

</script>

<style scoped>
.wrapper {
    height: 40%;
    width: 100%;
    margin: 0;
    padding: 0;
}

.image-cropper {
    margin: 0 !important;
    padding: 0 !important;
    height: 100%;
    background-color: aliceblue;
}

.control-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    position: fixed;
    margin-top: 10px;
    bottom: calc(55%);
}


.camera-button {
    background-color: transparent;
}

.camera-button img {
    width: 30px;
    height: 30px;
    object-fit: contain;
}

button {
    width: 8%;
    aspect-ratio: 1;
    z-index: 10000;
    color: black;
    background-color: yellow;
    border-radius: 10px;
    font-weight: bold;
}


</style>