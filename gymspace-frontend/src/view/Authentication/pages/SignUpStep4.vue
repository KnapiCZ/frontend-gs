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
<script setup>
import { IonContent, IonPage, IonSearchbar } from "@ionic/vue";
import { onMounted } from "vue";

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

const initMap = () => {
    const brnoCenter = { lat: 49.1951, lng: 16.6068 }; // Brno's coordinates

    // Initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
        center: brnoCenter,
        zoom: 14,
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

    // Fetch nearby gyms
    const service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
        {
            location: brnoCenter,
            radius: 5000, // Search within a 5km radius
            type: "gym", // Only fetch gyms
        },
        (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                results.forEach((place) => addMarker(place, map));
            } else {
                console.error("Error fetching gyms:", status);
            }
        }
    );
};

const addMarker = (place, map) => {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        position: place.geometry.location,
        map,
        title: place.name,
        icon: {
            url: "https://firebasestorage.googleapis.com/v0/b/gymspace-4b1e8.firebasestorage.app/o/division%2Fdivision_1%2Fdivision1.png?alt=media&token=f5914894-f609-47f9-9308-c707be3a834c", // Custom gym icon
            scaledSize: new google.maps.Size(30, 30),
        },
    });

    const infoWindow = new google.maps.InfoWindow({
        content: `
            <h3>${place.name}</h3>
            <p>${place.vicinity || "No address available"}</p>
        `,
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
};

window.initMap = initMap; // Expose initMap for callback

onMounted(async () => {
    try {
        await loadGoogleMapsApi();
    } catch (error) {
        console.error("Error loading Google Maps API:", error);
    }
});
</script>


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
