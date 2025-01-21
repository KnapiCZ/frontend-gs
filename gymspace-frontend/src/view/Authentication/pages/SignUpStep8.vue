<script lang="ts" setup>
import { userDataStore } from "@/stores/UserDataStore";
import { IonContent, IonPage, IonButton, useIonRouter } from "@ionic/vue";
import { ref } from "vue";
import apiUser from "@/logic/API/apiUser";

const userStore = userDataStore()
const router = useIonRouter()
const selectedSex = ref('');

let user_id = localStorage.getItem("logged_user_id")
let data = ""
const toggleSex = (sex: string) => {
    selectedSex.value = sex;
};

const setSex = async () => {
    userStore.addToDict("sex", selectedSex.value)
    router.push("/waiting-screen");
    data = userStore.getDictAsJson()
    await apiUser("update", (user_id as unknown as number), data)
}

</script>

<template>
    <IonPage>
        <IonContent class="sign-up-content">
            <h1 class="sign-up">Choose your gender...</h1>
            <div class="sex-buttons-container">
                <img src="../../../assets/images/Male.png" alt="Male Icon" class="sex-icon"
                    style="margin-right: 40%; bottom: 65%;" />
                <button class="sex-button" :class="{ active: selectedSex === 'm' }" @click="toggleSex('m')">

                    MALE
                </button>
                <img src="../../../assets/images/Female.png" alt="Female Icon" class="sex-icon"
                    style="margin-left: 25%; top: -25%;" />
                <button class="sex-button" :class="{ active: selectedSex === 'f' }" @click="toggleSex('f')">
                    FEMALE
                </button>
            </div>
            <IonButton fill="solid" class="sign-up-button" @click='setSex'>FINISH</IonButton>
        </IonContent>
    </IonPage>
</template>


<style scoped>
h1 {
    margin-bottom: 92px;
}

.sex-buttons-container {
    display: flex;
    height: 35%;
    gap: 15px;
    justify-content: center;
    position: relative;
}

.sex-button {
    width: 40%;
    height: 35%;
    font-size: 30px;
    font-weight: 900;
    color: white;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    margin-left: 10px;
    margin-right: 10px;
}



.sex-button.active {
    border-color: #ffe600;
    box-shadow: 0 6px 20px rgba(255, 230, 0, 0.7);
    background: rgba(255, 255, 0, 0.2);
    transform: scale(1.1);
}

.sex-icon {
    position: absolute;
    z-index: -1;
}
</style>
