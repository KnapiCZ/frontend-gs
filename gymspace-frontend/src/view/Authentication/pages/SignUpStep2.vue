<script setup lang="ts">
import { IonButton, IonCol, IonPage, useIonRouter, IonInput, IonContent } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { ref } from 'vue';
import apiUser from '@/logic/API/apiUser';
import apiAuth from '@/logic/API/apiAuth';

const userStore = userDataStore()
const router = useIonRouter();
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
        console.log(form.value)
        // TODO: pridat narozeniny
        await apiUser('createUser', 0, JSON.stringify(form.value));
        await apiAuth("getToken", form.value.username, form.value.password).then((token) => {
            localStorage.setItem("Token", token.Token);
        })
        router.push('/step-3');
    }
}

function checkPasswordCheck() {
    if (form.value.passwordCheck != undefined && form.value.password == form.value.passwordCheck) {
        setValid("check-password", true);
        return true;
    } else {
        setValid("check-password", false);
        return false;
    }
}
function checkPassword() {
    if (form.value.password != undefined && form.value.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/)) {
        setValid("password", true);
        return true;
    } else {
        setValid("password", false);
        return false;
    }
}

function checkUsername() {
    if (form.value.username != undefined && form.value.username.match(/^\S(?:.*\S)?$/)) {
        setValid("username", true);
        return true;
    } else {
        setValid("username", false);
        return false;
    }
}
function checkEmail() {
    if (form.value.email != undefined && form.value.email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )) {
        setValid("email", true);
        return true;
    } else {
        setValid("email", false);
        return false;
    }
}

function setValid(id: string, value: boolean) {
    let object = document.getElementById(id)?.classList;
    if (value) {
        object?.remove("ion-invalid");
        object?.remove("ion-touched");
        return true;
    } else {
        object?.add("ion-invalid");
        object?.add("ion-touched");
        canGo = false;
        return false;
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

div.helper-text {
    color: green !important;
}
</style>
