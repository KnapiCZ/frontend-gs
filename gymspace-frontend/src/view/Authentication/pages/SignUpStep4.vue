<script setup>
import { IonContent, IonPage, IonSearchbar, modalController } from "@ionic/vue";
import { userDataStore } from "@/stores/UserDataStore";
import { Geolocation } from '@capacitor/geolocation';
import { onMounted, ref } from "vue";
import apiGym from "@/logic/API/apiGym";
import ChooseGymModal from "../components/ChooseGymModal.vue";

const userStore = userDataStore()

let gyms = []
const myLocation = ref(
    {
        lng: 0,
        lat: 0

    }
)


const openModal = async (place_id) => {
    const modal = await modalController.create({
        component: ChooseGymModal,
        breakpoints: [0.5], // Define your breakpoints here
        initialBreakpoint: 0.5, // Set the initial breakpoint (default is 0.5)
        cssClass: 'custom-modal-class', // Optional, if you want to add custom CSS classes
        swipeToClose: true, // Enable swipe to close
        showBackdrop: false,
        id: place_id
    });

    modal.present();
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
    console.log('Current position:', coordinates,);
    return { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude }
};


const initMap = async () => {
    let centerOfMap = await printCurrentPosition()
    console.log(centerOfMap)
    // Initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
        center: centerOfMap,
        zoom: 12,
        gestureHandling: "greedy",
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
                url: "https://firebasestorage.googleapis.com/v0/b/gymspace-4b1e8.firebasestorage.app/o/division%2Fdivision_1%2Fdivision1.png?alt=media&token=f5914894-f609-47f9-9308-c707be3a834c", // Custom gym icon
                scaledSize: new google.maps.Size(30, 30),
            },
        });

        marker.addListener("click", () => {
            openModal(gym.place_id)
        });

    };


    console.log(gyms)
    for (let i = 0; i < gyms.length; i++) {
        console.log(gyms[i])
        addMarker(gyms[i], map)
    }

}


window.initMap = initMap; // Expose initMap for callback

gyms = await apiGym("location")


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
        <IonContent>
            <div class="top-container">
                <div class="title-container">
                    <p class="small-text">CHOOSE YOUR </p>
                    <h1 class="highlight">HOME GYM</h1>
                </div>
                <IonSearchbar showCancelButton="focus" class="custom" />
                <p class="create-text">
                    Can’t find your gym? <a href="/create-gym" class="create-link">Create it!</a>
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
    width: 90%;
    height: 15vh;
    margin: auto;
    background-color: rgb(37, 36, 21);
    border: 1px solid white;
    border-top: none;
    border-radius: 0 0 6px 6px;
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
    width: 90%;
    margin: 10px auto;
    padding: 0;
    box-shadow: 0 0px 10px #fff000, inset 0 0px 10px #fff000;
    backdrop-filter: blur(100px) !important;
    min-height: 0 !important;
    border-radius: 6px;
    --background: linear-gradient(90deg, #ffee0036, rgba(169, 169, 169, 0.192));
    --color: #fff;
    --placeholder-color: #fff;
    --icon-color: #fff000;
    --clear-button-color: #fff;
    --border-radius: 6px;
    --cancel-button-color: #19422d;
}

.create-text {
    margin-top: 10px;
    color: white;
    font-size: 14px;
}

.create-link {
    color: #fff000;
    font-weight: bold;
    text-decoration: none;
}

.create-link:hover {
    text-decoration: underline;
}
</style>
