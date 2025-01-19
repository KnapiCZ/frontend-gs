<script setup lang="ts">
import { IonButton, IonCol, IonPage, useIonRouter, IonInput, IonContent } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { ref } from 'vue';
import apiUser from '@/logic/API/apiUser';
import apiAuth from '@/logic/API/apiAuth';

const userStore = userDataStore()
const router = useIonRouter();

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/
const mailRegex = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


const error_message = ref(' ')
const form = ref({
    username: "f",
    email: "f",
    password: "f",
    passwordCheck: "f",
    birthday: "f"
});

let canGo = true;


async function submitForm() {
    canGo = true;
    checkPassword();
    checkEmail();
    checkUsername();
    checkPasswordCheck();
    if (canGo) {
        form.value.birthday = userStore.birthday
        let data = { "username_or_email": form.value.email, "password": form.value.password }
        console.log(form.value.password, form.value.email, form.value.username)

        await apiUser('create', 0, JSON.stringify(form.value)).then(async (response) => {
            if (response.status == "success") {
                await apiAuth("getToken", JSON.stringify(data)).then(async (token) => {
                    localStorage.setItem("Token", token.token);
                    router.push('/step-3');
                    await apiAuth("confirmAuth").then((user) => {
                        localStorage.setItem("logged_user_id", user.log)
                    })
                })
            } else {
                error_message.value = response.message
            }
        })

    }
}

const checkPasswordCheck = () => {
    if (form.value.passwordCheck == undefined) setValid("username", false);
    if (form.value.password == form.value.passwordCheck) setValid("check-password", true);
    else setValid("check-password", false);
}
const checkPassword = () => {
    if (form.value.password == undefined) setValid("username", false);
    if (form.value.password.match(passRegex)) setValid("password", true);
    else setValid("password", false);
}

const checkUsername = () => {
    if (form.value.username == undefined) setValid("username", false);
    if (form.value.username.match(/^\S(?:.*\S)?$/)) setValid("username", true);
    else setValid("username", false);
}
const checkEmail = () => {
    if (form.value.email == undefined) setValid("username", false);
    if (form.value.email.match(mailRegex)) setValid("email", true);
    else setValid("email", false);
}

function setValid(id: string, value: boolean) {
    let object = document.getElementById(id)?.classList;
    if (value) {
        object?.remove("ion-invalid");
        object?.remove("ion-touched");
    } else {
        object?.add("ion-invalid");
        object?.add("ion-touched");
        canGo = false;
    }
}
</script>

<template>
    <IonPage>
        <IonContent class="sign-up-content">
            <img src="../../../assets/images/logo-glow.png" class="sign-up-background-image" alt="GymSpace-Logo" />
            <IonCol>
                <p class="welcome">Welcome to Gymspace</p>
                <h1 class="sign-up-text">SIGN UP</h1>
                <p class="after-text">AND START YOUR JURNEY</p>

                <form @submit.prevent="submitForm" ref="form">
                    <IonInput id="username" class="custom" v-model="form.username" type="text" placeholder="Username"
                        error-text="Username can't be empty">
                    </IonInput>
                    <IonInput id="email" class="custom" v-model="form.email" type="email" placeholder="Email"
                        error-text="Invalid email">
                    </IonInput>
                    <IonInput id="password" class="custom" v-model="form.password" type="password"
                        placeholder="Password"
                        helper-text="Password must contain: 8-32 characters, (A-Z, a-z, 0-9, !@#$%^&*)"
                        error-text="Invalid Password">
                    </IonInput>
                    <IonInput id="check-password" class="pass custom" v-model="form.passwordCheck" type="password"
                        placeholder="Password confirmation" error-text="Invalid Password">
                    </IonInput>
                    <p class="error-message">{{ error_message }}</p>
                    <IonButton class="sign-up-button" @click="submitForm">SIGN UP</IonButton>
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

ion-content.sign-up-content {
    overflow: hidden;
    text-align: center;
}

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

ion-input.custom>.input-bottom>div.helper-text,
ion-input.custom.md .input-bottom .helper-text {
    color: green !important;
}

.input-bottom.sc-ion-input-ios {
    color: green !important;
}

.error-message {
    font-size: 14px;
    font-weight: bold;
    text-shadow: 0 0 10px black;
    color: yellow;
}
</style>
