<script setup lang="ts">
import GoogleMapsApiLoader from 'google-maps-api-loader'
import { ref } from 'vue';

const props = defineProps<{
    mapConfig?: Object,
    apiKey?: string,
}>()

let map: null
let google: null

async function mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
        apiKey: props.apiKey
    })
    google = googleMapApi
    initializeMap()
}


function initializeMap() {
    const mapContainer = ref.googleMap
    map = new google!.maps.Map(
        mapContainer, props.mapConfig
    )
}
</script>

<template>
    <div>
        <div class="google-map" ref="googleMap"></div>
        <template v-if="Boolean(google) && Boolean(map)">
            <slot :google="google" :map="map"></slot>
        </template>
    </div>
</template>