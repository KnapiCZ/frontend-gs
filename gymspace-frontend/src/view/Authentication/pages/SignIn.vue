<script setup lang="ts">
import { IonButton, IonCol, IonPage, useIonRouter, IonInput } from '@ionic/vue';
import apiUser from '@/logic/API/apiUser';
import apiAuth from '@/logic/API/apiAuth';

const router = useIonRouter();

let canGo = true;
let form = {
    handle: "f",
    username: "f",
    email: "f",
    password: "f",
    passwordCheck: "f",
};

async function submitForm() {
    canGo = true;
    checkPassword();
    checkEmail();
    checkUsername();
    checkHandle();
    checkPasswordCheck();
    if (canGo) {
        let data = form
        await apiUser('createUser', 0, JSON.stringify(data));
        await apiAuth("getToken", form.handle, form.password);
        await apiAuth("getToken", form.handle, form.password).then((token) => {
            localStorage.setItem("Token", token);
        })
        router.push('/');
    }
}

function checkPasswordCheck() {
    if (form.passwordCheck != undefined && form.password == form.passwordCheck) {
        setValid("check-password", true);
        return true;
    } else {
        setValid("check-password", false);
        return false;
    }
}
function checkPassword() {
    if (form.password != undefined && form.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/)) {
        setValid("password", true);
        return true;
    } else {
        setValid("password", false);
        return false;
    }
}

function checkUsername() {
    if (form.username != undefined && form.username.match(/^\S(?:.*\S)?$/)) {
        setValid("username", true);
        return true;
    } else {
        setValid("username", false);
        return false;
    }
}
function checkEmail() {
    if (form.email != undefined && form.email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )) {
        setValid("email", true);
        return true;
    } else {
        setValid("email", false);
        return false;
    }
}

function checkHandle() {
    if (form.handle != undefined && form.handle.match(/^[A-Za-z0-9_]+$/) && form.handle.length < 31) {
        setValid("handle", true);
        return true;
    } else {
        setValid("handle", false);
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
        <IonCol>
            <p class="welcome">Sign - Up</p>

            <form @submit.prevent="submitForm">
                <IonInput id="handle" ref="form" type="text" fill="solid" label="Handle" label-placement="floating"
                    helper-text="Enter a valid handle" error-text="Invalid handle, letters, digits and _ only."
                    v-model="form.handle">
                </IonInput>
                <IonInput id="username" ref="form" type="text" fill="solid" label="Username" label-placement="floating"
                    helper-text="Enter a valid username" error-text="Username can't be empty" v-model="form.username">
                </IonInput>
                <IonInput id="email" ref="form" type="email" fill="solid" label="Email" label-placement="floating"
                    helper-text="Enter a valid email" error-text="Invalid email" v-model="form.email">
                </IonInput>
                <IonInput id="password" ref="form" type="password" fill="solid" label="Password"
                    label-placement="floating" helper-text="Enter a valid Password" error-text="Password must contain at least: 8 characters, uppercase letter (A-Z),
                    lowercase letter (a-z), digit (0-9), special character (@, #, $, etc.)" v-model="form.password">
                </IonInput>
                <IonInput id="check-password" ref="form" type="password" fill="solid" label="Password confirmation"
                    label-placement="floating" helper-text="Enter a password again" error-text="Invalid Password"
                    v-model="form.passwordCheck">
                </IonInput>
                <IonButton class="Login" color="transparent" @click="submitForm()">Create Account</IonButton>
            </form>
        </IonCol>
    </IonPage>
</template>

<style scoped>
* {
    margin: auto;
    width: 100%;
    text-align: center;
}

ion-input {
    text-align: left;
    width: 90%;
}

.welcome {
    color: white;
    font-size: 8vw;
    text-align: center;
    margin-top: 40px;
}

ion-button {
    margin: 10px 0;
    width: 80%;
    height: 50px;
    border-radius: 10px;

}

.Login {
    background-color: #fff000;
    color: black;
    font-size: 4vw;
    font-weight: bold;
}
</style>
