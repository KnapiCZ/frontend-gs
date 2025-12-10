<script setup lang="ts">
import { IonButton, IonCol, IonContent, IonPage, IonToolbar, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { useRoute } from 'vue-router';
import apiUser from '@/logic/API/apiUser';

//Využije se později ve vývoji
const props = defineProps<{
    id: number
}>();

const route = useRoute();
const router = useIonRouter()
const userStore = userDataStore();
const baseUrl = await apiUser();
let id = route.params.id as unknown as number;
let userData = await apiUser("profile", id);

</script>


<template>
    <IonRow>
        <IonCol>
            <div class="subscription">
                <img class="lock-icon" src="../../../../assets/icons/lock.svg" />
                <IonButton expand="block" class="subscribe-button">
                    Subscribe for 4 € a month
                </IonButton>
            </div>
        </IonCol>
    </IonRow>
</template>

<style scoped>
p {
    padding-top: 10px;
}

.subscription {
    text-align: center;
    background: #4F4F4F;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 10px;
}

.lock-icon {
    width: 40px;
    margin-bottom: 10px;
}

.subscribe-button {
    --background: #313131;
    color: white;
    font-weight: bold;
}
</style>