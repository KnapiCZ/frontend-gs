<script setup lang="ts">
import { IonButton, IonCol, IonPage, useIonRouter, IonInput, IonContent, IonIcon } from "@ionic/vue"
import { userDataStore } from "@/stores/UserDataStore"
import { ref } from "vue"
import apiUser from "@/logic/API/apiUser"
import apiAuth from "@/logic/API/apiAuth"
import { eye } from "ionicons/icons"
const userStore = userDataStore()
const router = useIonRouter()

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~@#$%^&+=]).{8,}$/
const mailRegex =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const passwordVisible = ref<boolean[]>([false, false])

const error_message = ref(" ")
const form = ref({
    username: "f",
    email: "f",
    password: "f",
    passwordCheck: "f",
    birthday: "f",
})

let canGo = true

const backToLogin = () => {
    router.navigate("/login", "back", "push")
}

const submitForm = async () => {
    canGo = true
    checkPassword()
    checkEmail()
    checkUsername()
    checkPasswordCheck()
    if (canGo) {
        let data = {
            username: form.value.username,
            email: form.value.email,
            password: form.value.password,
            birthday: userStore.getFromDict("registerData", "birthDate"),
        }
        await apiUser("create", 0, JSON.stringify(data)).then(async (response) => {
            if (response.status == "success") {
                let data2 = {
                    username_or_email: form.value.email,
                    password: form.value.password,
                }
                await apiAuth("getToken", JSON.stringify(data2)).then((response) => {
                    if (response.status == "success") {
                        localStorage.setItem("Token", response.data.token)
                        localStorage.setItem("logged_user_id", response.data.user_id)
                        router.push("/step-3")
                    } else {
                        error_message.value == response.message
                    }
                })
            } else {
                error_message.value = response.message
            }
        })
    }
}

const checkPasswordCheck = () => {
    if (form.value.passwordCheck == undefined) setValid("username", false)
    if (form.value.password == form.value.passwordCheck) setValid("check-password", true)
    else setValid("check-password", false)
}
const checkPassword = () => {
    if (form.value.password == undefined) setValid("username", false)
    if (form.value.password.match(passRegex)) setValid("password", true)
    else setValid("password", false)
}

const checkUsername = () => {
    if (form.value.username == undefined) setValid("username", false)
    if (form.value.username.match(/^\S(?:.*\S)?$/)) setValid("username", true)
    else setValid("username", false)
}
const checkEmail = () => {
    if (form.value.email == undefined) setValid("username", false)
    if (form.value.email.match(mailRegex)) setValid("email", true)
    else setValid("email", false)
}

const setValid = (id: string, value: boolean) => {
    let object = document.getElementById(id)?.classList
    if (value) {
        object?.remove("ion-invalid")
        object?.remove("ion-touched")
    } else {
        object?.add("ion-invalid")
        object?.add("ion-touched")
        canGo = false
    }
}

const togglePasswordVisibility = (index: number): void => {
    passwordVisible.value[index] = !passwordVisible.value[index]
}
</script>

<template>
    <IonPage>
        <IonContent class="sign-up-content top-padding-notch" :scroll-y="false">
            <img src="../../../assets/images/logo-glow.png" class="sign-up-background-image" alt="GymSpace-Logo" />
            <IonCol>
                <p class="welcome">Welcome to Gymspace</p>
                <h1 class="sign-up-text">SIGN UP</h1>
                <p class="after-text">AND START YOUR JURNEY</p>

                <form @submit.prevent="submitForm" ref="form">
                    <IonInput
                        id="username"
                        class="custom username border-gradient"
                        v-model="form.username"
                        type="text"
                        placeholder="Username"
                        error-text="Username can't be empty"
                    />
                    <IonInput
                        id="email"
                        class="custom border-gradient"
                        v-model="form.email"
                        type="email"
                        placeholder="Email"
                        error-text="Invalid email"
                    />
                    <IonInput
                        id="password"
                        class="custom border-gradient"
                        v-model="form.password"
                        :type="passwordVisible[0] ? 'text' : 'password'"
                        placeholder="Password"
                        helper-text="Password must contain: 8-32 characters, (A-Z, a-z, 0-9, special character)"
                        error-text="Invalid Password"
                    >
                        <IonButton
                            class="show-password"
                            @click="togglePasswordVisibility(0)"
                            fill="clear"
                            slot="end"
                            aria-label="Show/hide"
                        >
                            <IonIcon
                                slot="icon-only"
                                :icon="eye"
                                aria-hidden="true"
                                style="font-size: 20px; vertical-align: top; padding: 0"
                            >
                            </IonIcon>
                        </IonButton>
                    </IonInput>
                    <IonInput
                        id="check-password"
                        class="pass custom border-gradient"
                        v-model="form.passwordCheck"
                        :type="passwordVisible[1] ? 'text' : 'password'"
                        placeholder="Password confirmation"
                        error-text="Invalid Password"
                    >
                        <IonButton
                            class="show-password"
                            @click="togglePasswordVisibility(1)"
                            fill="clear"
                            slot="end"
                            aria-label="Show/hide"
                        >
                            <IonIcon
                                slot="icon-only"
                                :icon="eye"
                                aria-hidden="true"
                                style="font-size: 20px; vertical-align: top; padding: 0"
                            >
                            </IonIcon>
                        </IonButton>
                    </IonInput>
                    <p class="error-message">{{ error_message }}</p>
                    <IonButton class="sign-up-button" @click="submitForm">SIGN UP</IonButton>
                    <p @click="backToLogin">Back to Login</p>
                </form>
            </IonCol>
        </IonContent>
    </IonPage>
</template>

<style scoped>
* {
    margin: auto;
    text-align: center;
}

.show-password {
    padding: 0;
    margin: 0;
    margin-right: -10px;
}

.welcome {
    font-size: 14px;
    font-weight: 300;
    margin-top: 30px;
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

#password {
    margin-bottom: 50px;
}

ion-input.custom > .input-bottom > div.helper-text,
ion-input.custom.md .input-bottom .helper-text {
    color: green;
}

.input-bottom.sc-ion-input-ios {
    color: green;
}

.error-message {
    font-size: 14px;
    font-weight: bold;
    text-shadow: 0 0 10px black;
    color: yellow;
}

.sign-up-background-image {
    opacity: 0.5;
}

#username.border-gradient::before {
    background: linear-gradient(
        165deg,
        rgba(255, 255, 255) 4%,
        rgba(255, 255, 255, 0.459) 52%,
        rgba(255, 255, 255, 0.349) 80%,
        rgba(255, 240, 0, 0.129)
    );
}

#email.border-gradient::before {
    background: linear-gradient(
        165deg,
        rgba(255, 255, 255, 0.35) 14%,
        rgba(255, 255, 255, 0.46) 48%,
        rgba(255, 240, 0, 0.13) 73%,
        rgba(255, 255, 255, 1) 100%
    );
}

#password.border-gradient::before {
    background: linear-gradient(
        165deg,
        rgba(255, 255, 255, 1) 4%,
        rgba(255, 255, 255, 0.46) 39%,
        rgba(255, 240, 0, 0.13) 65%,
        rgba(255, 255, 255, 0.46) 84%,
        rgba(255, 255, 255, 0.35) 100%
    );
}

#check-password.border-gradient::before {
    background: linear-gradient(
        165deg,
        rgba(255, 255, 255, 1) 4%,
        rgba(255, 240, 0, 0.13) 27%,
        rgba(255, 255, 255, 0.35) 52%,
        rgba(255, 255, 255, 0.46) 100%
    );
}
</style>
