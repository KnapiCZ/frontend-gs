<script setup lang="ts">
import { ref } from "vue"
import { IonButton, IonCol, IonContent, IonInput, IonPage, useIonRouter } from "@ionic/vue"
import apiAuth from "@/logic/API/apiAuth"
import { pull } from "lodash"

const router = useIonRouter()
const error_message = ref(" ")
const form = ref({
    username_or_email: "",
    password: "",
})

const submitForm = async () => {
    if (form.value.username_or_email != "" && form.value.password != "") {
        await apiAuth("getToken", JSON.stringify(form.value)).then((response) => {
            if (response.status == "success") {
                let path = "/user/" + response.data.user_id
                localStorage.setItem("Token", response.data.token)
                localStorage.setItem("logged_user_id", response.data.user_id)
                router.navigate(path, "forward", "push")
            } else {
                error_message.value = response.error[0]
            }
        })
    } else {
        error_message.value = "Username/Email and Password can`t be empty"
    }
}

const createAccount = () => {
    router.navigate("/step-1", "forward", "push")
}
</script>

<template>
    <IonPage>
        <IonContent class="top-padding-notch">
            <IonCol>
                <h1 class="welcome">WELCOME TO</h1>

                <img class="logo" src="\src\assets\images\gs_logo.png" alt="logo" />
                <form @submit.prevent="submitForm">
                    <IonInput
                        id="UsernameAuth"
                        class="custom border-gradient"
                        type="text"
                        placeholder="Username or Email"
                        v-model="form.username_or_email"
                    />
                    <IonInput
                        id="PassAuth"
                        class="custom border-gradient"
                        type="password"
                        placeholder="Password"
                        v-model="form.password"
                    />
                    <p class="error-message">{{ error_message }}</p>

                    <IonButton class="default" @click="submitForm()">Login</IonButton>
                </form>
                <div class="row">
                    <a class="sign-up" @click="createAccount">NEW? SIGN-UP HERE</a>
                    <a class="sign-up" href="https://support.gymspace.app/password_reset/">FORGOTEN PASSWORD</a>
                </div>
            </IonCol>
        </IonContent>
    </IonPage>
</template>

<style scoped>
* {
    text-align: center;
}

.logo {
    margin: auto;
    width: 60%;
}

.welcome {
    margin-top: 40px;
}

.column {
    width: 100%;
}

ion-button.default {
    width: 70%;
    color: black;
    height: 50px;
    --background: #fff000;
}

ion-input.border-gradient::before {
    background: linear-gradient(165deg, #fff 4%, #ffffff75 52%, #ffffff59 80%), #fff00021;
}

.sign-img {
    width: 40px;
    height: 40px;
    margin: 20px 10px;
}

.sign-up {
    padding: 16px;
}
</style>
