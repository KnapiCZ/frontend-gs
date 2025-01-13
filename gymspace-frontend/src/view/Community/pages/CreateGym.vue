<template>
    <div class="gym-registration">
        <h1>Create Your Gym</h1>

        <div class="search-bar">
            <input type="text" id="autocomplete" v-model="gymName" placeholder="Enter gym name or location" />
        </div>

        <!-- Additional fields that get filled after selecting a gym -->
        <div v-if="selectedGym" class="gym-details">
            <div>
                <label for="address">Address:</label>
                <input type="text" id="address" v-model="selectedGym.address" placeholder="Gym address" disabled />
            </div>

            <div>
                <label for="latitude">Latitude:</label>
                <input type="text" id="latitude" v-model="selectedGym.latitude" placeholder="Gym latitude" disabled />
            </div>

            <div>
                <label for="longitude">Longitude:</label>
                <input type="text" id="longitude" v-model="selectedGym.longitude" placeholder="Gym longitude"
                    disabled />
            </div>

            <button @click="confirmGym">Confirm Gym</button>
        </div>

        <div class="create-gym">
            <p>Can't find your gym?</p>
            <button @click="">Create Gym</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// References for gym name and selected gym data
const city = ref('');
const street = ref('');
const gymName = ref('');
const selectedGym = ref<{
    name: string | null;
    address: string | null;
    latitude: string | null;
    longitude: string | null;
} | null>(null);

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
    const input = document.getElementById('autocomplete') as HTMLInputElement;
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
        selectedGym.value = {
            name: place.name || 'Unnamed gym',
            address: place.formatted_address || 'No address available',
            latitude: place.geometry.location.lat().toString(),
            longitude: place.geometry.location.lng().toString(),
        };

        // Extract city and street from the formatted address
        extractCityAndStreet(place.formatted_address);
    });
};

const extractCityAndStreet = (address) => {
    // Regular expression for matching a postal code (5 digits, or 5+4 digits)
    const postalCodeRegex = /\b\d{3} \d{2}\b/;

    // Remove postal code from the address
    const addressWithoutPostalCode = address.replace(postalCodeRegex, '').trim();

    // Split the remaining address by commas
    const addressParts = addressWithoutPostalCode.split(',');

    // Assuming the first part is the street and second part is the city
    const street = addressParts[0]?.trim() || '';
    const city = addressParts[1]?.trim() || '';
    console.log("Street: " + street + "   City:" + city)
    return { street, city };
};



// Function to handle gym registration confirmation
const confirmGym = () => {
    if (selectedGym.value) {
        // Logic to save the gym data, e.g., sending it to the backend
        alert(`Gym confirmed: ${selectedGym.value.name}`);
        console.log('Gym Data:', selectedGym.value);
    }
};

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

<style scoped>
.gym-registration {
    width: 100vw;
    margin: 0 auto;
    text-align: center;

}

.search-bar input {
    width: 90%;
    padding: 10px;

    margin: 10px auto;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.gym-details {
    margin-top: 20px;
}

.gym-details div {
    margin-bottom: 10px;
}

.gym-details label {
    display: block;
    font-weight: bold;
}

.gym-details input {
    width: 90%;
    padding: 10px;
    margin: 10px auto;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #ffcc00;
    color: #000;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
}

button:hover {
    background-color: #ffdb4d;
}

.create-gym {
    margin-top: 20px;
    text-align: center;
}
</style>
