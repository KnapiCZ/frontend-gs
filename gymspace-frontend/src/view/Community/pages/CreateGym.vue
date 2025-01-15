<script setup lang="ts">
import { IonButton, IonInput, IonPage, IonContent, IonCol, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { ref, onMounted } from 'vue';
import apiGym from '@/logic/API/apiGym';

const userStore = userDataStore()
const router = useIonRouter()

const gymName = ref('');
const form = ref({
    creator_id: localStorage.getItem("logged_user_id"),
    title: "",
    city: '',
    address: "",
    country: "",
    latitude: 0,
    longtitude: 0,
    email: "",
    phone: "",
    place_id: ''
});

// Dynamically load the Google Maps API script
const loadGoogleMapsScript = () => {
    return new Promise<void>((resolve, reject) => {
        if (document.getElementById('google-maps-script')) {
            resolve(); // Script already loaded
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAzxwhowxPHs0lNimraIdQIoETUcsrto-U&libraries=places`;
        script.id = 'google-maps-script';
        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
    });
};

// Initialize the Google Autocomplete API
const initAutocomplete = () => {
    const input = document.getElementById('ion-input-0') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['gym'], // Limit the search to places like gyms
        fields: ['place_id', 'name', 'formatted_address', 'geometry'],
    });

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
            console.log('Place has no geometry!');
            return;
        }

        // Populate the selected gym data with name, address, and coordinates
        gymName.value = place.name;
        form.value.title = place.name || 'Unnamed gym'
        form.value.latitude = place.geometry.location.lat()
        form.value.longtitude = place.geometry.location.lng()
        form.value.place_id = place.place_id
        transformAddress(place.formatted_address)
    });
};

function transformAddress(address) {
    // Split address into parts
    const parts = address.split(", ");

    // The last part is the country
    const country = parts.pop();

    // The second-to-last part is the city (with postal code)
    let city = parts.pop();

    // Remove postal code (assumed to be at the start of the city part)
    city = city.replace(/\d{1,5}\s?\d{0,5}/, '').trim();

    // The first part is the street address
    const street = parts.join(", ");
    form.value.address = street
    form.value.city = city
    form.value.country = country
    // Return the formatted address without the postal code
    return `${street}, ${city}, ${country}`;
}



// Function to handle gym registration confirmation
const confirmGym = () => {
    apiGym('create', undefined, JSON.stringify(form.value)).then(() =>
        router.push('/step-5')
    )

};

const back = () => {
    router.back()
}

// Initialize the Google Autocomplete once the script is loaded
onMounted(async () => {
    try {
        await loadGoogleMapsScript();
        initAutocomplete(); // Initialize after script is loaded
    } catch (error) {
        console.error('Error loading Google Maps script:', error);
    }
});
</script>


<template>
    <IonPage>
        <IonContent class="sign-up-content">

            <img src="../../../assets/images/logo-glow.png" class="sign-up-background-image" alt="GymSpace-Logo" />
            <IonCol>

                <p class="welcome feature">This gym is unofficial. Official gyms need to be approved by their owner</p>
                <p class="welcome">THIS FEATURE IS COMING SOON</p>
                <h1 class="sign-up-text">CREATE GYM</h1>
                <p class="after-text">AND BRING IT TO LIFE</p>

                <form @submit.prevent="confirmGym">

                    <IonInput id="autocomplete" class="custom" v-model="gymName" type="text"
                        placeholder="Search for gym" error-text="Invalid Password">
                    </IonInput>
                    <IonInput id="address" class="custom" v-model="form.address" type="text" placeholder="Street"
                        error-text="Invalid Password" :readonly="true">
                    </IonInput>
                    <IonInput id="city" class="custom" v-model="form.city" type="text" placeholder="City"
                        error-text="Invalid Password" :readonly="true">
                    </IonInput>
                    <IonInput id="email" class="custom" v-model="form.email" type="email" placeholder="Email"
                        error-text="Invalid Password">
                    </IonInput>
                    <IonInput id="mobile" class="pass custom" v-model="form.phone" type="text" placeholder="Phone"
                        error-text="Invalid Password">
                    </IonInput>
                    <IonButton class="sign-up-button" @click="confirmGym">CREATE GYM</IonButton>
                </form>
                <p class="welcome" @click="back"><img src="../../../assets/icons/arrowRight.svg" alt="">Return back to
                    map</p>

            </IonCol>
        </IonContent>
    </IonPage>
</template>


<style scoped>
ion-input.custom {
    text-align: left;
    width: 87%;
    height: 44px;
    margin: 25px auto;
    font-size: 16px;
    --border-style: none;
    --border-color: none;
    --border-radius: none;
    --background: #24242440;
    --color: #fff;
    --padding-end: 20px;
    --padding-start: 20px;
    border-radius: 6px;
    border: solid 1px rgba(255, 255, 255, 0.651);
    backdrop-filter: blur(26px);
}

.welcome {
    font-size: 14px;
    font-weight: 300;
    margin-top: 20px;
}

.sign-up-text {
    font-size: 46px;
    font-weight: 900;
    margin: 10px auto 30px auto;
}

.after-text {
    font-weight: 500;
    margin-bottom: 30px;
}


.feature {
    margin-top: 30px;
    color: red;
    padding: 0 10px;
}

.welcome img {
    rotate: 180deg;
    margin-right: 10px;
}
</style>
