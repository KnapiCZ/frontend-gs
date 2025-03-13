<script setup lang="ts">
import "vue-advanced-cropper/dist/style.css"
import { Cropper } from "vue-advanced-cropper"
import { usePhotoGallery } from "@/plugins/usePhotoGallery"
import { ref, computed } from "vue"
import { userDataStore } from "@/stores/UserDataStore"

const { photos, takePhoto } = usePhotoGallery()
const userStore = userDataStore()

const props = defineProps<{
    ratios: [number, number][]
}>()

const count = ref(0)

// Dynamický poměr stran podle počtu kliknutí
const aspectRatio = computed(() => {
    const ratio = props.ratios[count.value % props.ratios.length]
    return ratio[0] / ratio[1]
})

// Funkce pro změnu poměru stran
const changeRatio = () => {
    count.value++
}

// Funkce pro změnu výřezu
const onChange = ({
    coordinates,
    canvas,
}: {
    coordinates: { width: number; height: number; left: number; top: number }
    canvas: HTMLCanvasElement
}) => {
    userStore.croppedChoosenPhoto = canvas.toDataURL()
}
</script>

<template>
    <div class="wrapper">
        <Cropper
            :key="'cropper' + count"
            class="image-cropper"
            boundingBoxClass="bounding-box-class"
            imageClass="cropper-image"
            backgroundClass="cropper-background"
            image-restriction="stencil"
            @change="onChange"
            :src="userStore.choosenPhoto"
            :stencil-props="{
                previewClass: 'preview',
                handlers: {},
                movable: false,
                resizable: false,
                aspectRatio: aspectRatio,
            }"
            :resize-image="{
                adjustStencil: false,
            }"
        />
        <div class="control-panel">
            <button v-if="props.ratios.length > 1" @click="changeRatio">
                {{ props.ratios[count % props.ratios.length][0] + "/" + props.ratios[count % props.ratios.length][1] }}
            </button>

            <button @click="takePhoto()" class="camera-button">
                <img src="@/assets/icons/camera.svg" alt="Camera" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    height: 40%;
    width: 100%;
    margin: 0;
    padding: 0;
}

.image-cropper {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: black;
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
    margin: 0 20px;
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
