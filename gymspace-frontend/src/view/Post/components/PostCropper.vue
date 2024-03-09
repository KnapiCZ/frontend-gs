<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
let w = 4
let h = 5
</script>

<template>
    <Cropper classname="image-cropper" boundingBoxClass="bounding-box-class" imageClass="cropper-image"
        backgroundClass="cropper-background" @change="onChange" :src="userStore.choosenPhoto" :stencil-props="{
            previewClass: 'preview',
            handlers: {},
            movable: false,
            resizable: false,
            aspectRatio: w / h,
        }" :resize-image="{
            adjustStencil: false,


        }
            " image-restriction="stencil" />


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

<style>
.image-cropper {
    margin: 0 !important;
    padding: 0 !important;
    height: 50%;
    background-color: aliceblue;
}
</style>