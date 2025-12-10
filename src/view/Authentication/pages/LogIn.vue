<script setup lang="ts">
import { IonButton, IonCol, IonContent, IonInput, IonPage, useIonRouter } from "@ionic/vue"
import { ref } from "vue"

import apiAuth from "@/logic/API/apiAuth"
import type { CredentialsPayload } from "@/logic/types/auth.ts"
const router = useIonRouter()
const error_message = ref(" ")
const form = ref<CredentialsPayload>({
    username_or_email: "",
    password: "",
})

const submitForm = async () => {
    if (form.value.username_or_email != "" && form.value.password != "") {
        await apiAuth.getToken(form.value).then((response) => {
            if (response.status == "success" && response.data) {
                const path = "/user/" + response.data.user_id
                localStorage.setItem("Token", response.data.token)
                localStorage.setItem("logged_user_id", response.data.user_id)
                router.navigate(path, "forward", "push")
            } else {
                error_message.value = response.message
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
        <h1 class="welcome">
          WELCOME TO
        </h1>

        <img
          class="logo"
          src="\src\assets\images\gs_logo.png"
          alt="logo"
        >
        <form @submit.prevent="submitForm">
          <IonInput
            id="UsernameAuth"
            v-model="form.username_or_email"
            class="custom border-gradient"
            type="text"
            placeholder="Username or Email"
          />
          <IonInput
            id="PassAuth"
            v-model="form.password"
            class="custom border-gradient"
            type="password"
            placeholder="Password"
          />
          <p class="error-message">
            {{ error_message }}
          </p>

          <IonButton
            class="default"
            @click="submitForm()"
          >
            Login
          </IonButton>
        </form>
        <div class="row">
          <a
            class="sign-up"
            @click="createAccount"
          >NEW? SIGN-UP HERE</a>
          <a
            class="sign-up"
            href="https://support.gymspace.app/password_reset/"
          >FORGOTEN PASSWORD</a>
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
