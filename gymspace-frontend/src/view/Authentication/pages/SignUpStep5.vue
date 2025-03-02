<script setup>
import { IonContent, IonItem, IonList, IonPage, IonSearchbar, modalController } from "@ionic/vue";
import { Geolocation } from '@capacitor/geolocation';
import { onMounted, ref } from "vue";
import gymMarker from '@/assets/images/gymMarker.png'
import apiGym from "@/logic/API/apiGym";
import ChooseGymModal from "../components/ChooseGymModal.vue";

const searchQuery = ref("");
const gyms = ref([])
const markerGyms = ref([])
let isModalOpen = false;

const handleSearch = async () => {
    console.log("caleeed")
    if (searchQuery.value.length >= 3) {
        await apiGym("search", undefined, undefined, searchQuery.value).then((response) => {
            if (response.status == "success") {
                if (response.data != null) {
                    gyms.value = response.data
                } else {
                    gyms.value = []
                }
            }
        })
    } else {
        gyms.value = []
    }
}

const openModal = async (gym_id) => {
    if (isModalOpen) return;

    isModalOpen = true;
    const modal = await modalController.create({
        component: ChooseGymModal,
        breakpoints: [0.5, 0.6], // Define your breakpoints here
        initialBreakpoint: 0.5, // Set the initial breakpoint (default is 0.5)
        cssClass: 'custom-modal-class border-radius', // Optional, if you want to add custom CSS classes
        swipeToClose: true, // Enable swipe to close
        showBackdrop: false,
        componentProps: {
            gym_id: gym_id
        }
    });

    await modal.present();

    modal.onDidDismiss().then(() => {
        isModalOpen = false;
    });
};

const loadGoogleMapsApi = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAzxwhowxPHs0lNimraIdQIoETUcsrto-U&libraries=places&v=weekly&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    return { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude }
};

const initMap = async () => {
    let centerOfMap = await printCurrentPosition()
    // Initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
        center: centerOfMap,
        zoom: 12,
        gestureHandling: "greedy",
        keyboardShortcuts: false,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }], // Hide default POI labels
            },
            {
                featureType: "poi.business",
                stylers: [{ visibility: "off" }], // Hide business-related POIs
            },
            {
                featureType: "poi.park",
                stylers: [{ visibility: "off" }], // Hide parks if needed
            },
            {
                elementType: "geometry",
                stylers: [
                    {
                        color: "#212121"
                    }
                ]
            },
            {
                elementType: "labels.icon",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#757575"
                    }
                ]
            },
            {
                elementType: "labels.text.stroke",
                stylers: [
                    {
                        color: "#212121"
                    }
                ]
            },
            {
                featureType: "administrative",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#757575"
                    }
                ]
            },
            {
                featureType: "administrative.country",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#9e9e9e"
                    }
                ]
            },
            {
                featureType: "administrative.land_parcel",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#bdbdbd"
                    }
                ]
            },
            {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#212121"
                    }
                ]
            },
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#2c2c2c"
                    }
                ]
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#181818"
                    }
                ]
            },
            {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [
                    {
                        color: "#2c2c2c"
                    }
                ]
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [
                    {
                        color: "#3a3a3a"
                    }
                ]
            },
            {
                featureType: "road",
                elementType: "labels.icon",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#3c3c3c"
                    }
                ]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [
                    {
                        color: "#3c3c3c"
                    }
                ]
            },
            {
                featureType: "road.highway.controlled_access",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#2e2e2e"
                    }
                ]
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#2c2c2c"
                    }
                ]
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#8a8a8a"
                    }
                ]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#212121"
                    }
                ]
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#3d3d3d"
                    }
                ]
            }
        ],
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
    });


    const addMarker = (gym, map) => {

        const marker = new google.maps.Marker({
            position: { lat: gym.latitude, lng: gym.longtitude },
            map,
            title: gym.title,
            icon: {
                url: "https://firebasestorage.googleapis.com/v0/b/gymspace-4b1e8.firebasestorage.app/o/assets%2FgymMarker.png?alt=media&token=fa78517e-4637-4e5b-a60f-6ab6ca622046", // Custom gym icon
                scaledSize: new google.maps.Size(50, 50),
            },
        });

        marker.addListener("click", () => {
            openModal(gym.id)
        });

    };


    for (let i = 0; i < markerGyms.value.length; i++) {
        addMarker(markerGyms.value[i], map)
    }

}

const loadMarkers = async () => {
    await apiGym("location").then((response) => {
        if (response.status == "success") {
            markerGyms.value = response.data
        }
    })
}

window.initMap = initMap; // Expose initMap for callback

loadMarkers()


onMounted(async () => {
    try {
        await loadGoogleMapsApi();
    } catch (error) {
        console.error("Error loading Google Maps API:", error);
    }
});
</script>

<template>
    <IonPage>
        <IonContent class="sign-up-content">
            <div class="top-container">
                <div class="title-container border-gradient">
                    <p class="small-text">CHOOSE YOUR </p>
                    <h1 class="highlight">HOME GYM</h1>
                </div>
                <IonSearchbar showCancelButton="never" class="custom border-gradient" @update:modelValue="handleSearch"
                    debounce="200" v-model="searchQuery" />
                <IonList v-if="searchQuery.length >= 3 && gyms.length != 0">
                    <IonItem v-for="gym in gyms" :key="gym.id" class="gym-bio" @click.once="openModal(gym.id)">
                        <img class="logo" src="../../../assets/images/logo-glow.png" alt="">
                        <div class="gym-info">
                            <h2>{{ gym.title }}</h2>
                            <p class="bio-text">{{ gym.city }}, {{ gym.address }}</p>
                            <a href="newpark.cz">newpark.cz</a>
                        </div>
                    </IonItem>
                </IonList>
                <p class="create-text">
                    Can`t find your gym? <a href="/create-gym" class="create-link">Create it!</a>
                </p>
            </div>
            <div id="map"></div>
        </IonContent>
    </IonPage>
</template>


<style scoped>
#map {
    width: 100%;
    height: 100%;
}

.top-container {
    z-index: 10;
    text-align: center;
    color: white;
    width: 100%;
    position: absolute;
}

.title-container {
    width: 97%;
    height: 15vh;
    margin: auto;
    background-color: rgb(37, 36, 21);
    border-radius: 0 0 6px 6px;
    padding: 0;
    position: relative;
}

p.small-text {
    padding-top: 10px;
    font-size: 24px;
}

h1 {
    font-size: 32px;
    margin: 0 auto;
}

.highlight {
    color: #fff000;
    font-weight: bold;
}

ion-searchbar.custom,
ion-searchbar.ios.custom,
ion-searchbar.md.custom {
    font-weight: 800;
    text-align: left;
    width: 97%;
    margin: 10px auto;
    padding: 0;
    box-shadow: 0 0px 10px #fff000, inset 0 0px 25px 1px #7a7007;
    backdrop-filter: blur(5px) !important;
    min-height: 0 !important;
    border-radius: 6px;
    --background: linear-gradient(90deg,
            rgba(224, 206, 13, 0.35) 0%,
            rgba(175, 173, 150, 0.18) 88%,
            rgb(169, 169, 169, 0.15) 100%);
    --color: #fff;
    --placeholder-color: #fff;
    --icon-color: #fff000;
    --clear-button-color: #fff;
    --border-radius: 6px;
    --cancel-button-color: #19422d;
    --placeholder-font-weight: 700;
    --placeholder-opacity: 1;
}

.title-container.border-gradient::before {
    border-radius: 0 0 6px 6px;
    padding-top: 0;
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.46) 52%,
            rgba(255, 255, 255, 0.69) 65%,
            rgba(255, 240, 0, 0.68) 80%,
            rgb(255, 240, 0, 0.34) 96%);
}

ion-search.border-gradient::before {
    background: linear-gradient(135deg,
            rgba(255, 255, 255, 13) 4%,
            rgba(255, 255, 255, 0.459) 52%,
            rgba(255, 255, 255, 0.349) 80%,
            rgba(255, 240, 0, 0.129), 100%);
}

.create-text {
    margin-top: 10px;
    color: white;
    font-weight: 600;
    font-size: 0.85rem;
    text-shadow: rgb(0, 0, 0) 0 0 10px;
}

.create-link {
    color: #fff000;
    font-weight: bold;
    text-decoration: none;
}

.bio-text {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.logo {
    width: 50px;
    margin: auto 5px;
    margin: 10px;
    aspect-ratio: 1/1 !important;
    border-radius: 100px;
    border: solid 1px #fff000;
    object-fit: cover;
}

.gym-info {
    width: 100%;
    margin: auto;
}

h2 {
    font-size: 1rem;
}

ion-list {
    margin: auto;
    border-radius: 6px;
    background-color: transparent;
}

ion-item {
    padding: 2px 5px;
    border-radius: 6px;
    --border-radius: 6px
}
</style>
