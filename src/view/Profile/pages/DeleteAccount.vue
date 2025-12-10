<script setup lang="ts">
import "swiper/swiper-bundle.css"

import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from "@ionic/vue"
import { eye } from "ionicons/icons"
import { onMounted,ref } from "vue"

import apiAuth from "@/logic/API/apiAuth"
import apiUser from "@/logic/API/apiUser"

const router = useIonRouter()
const code = ref(["", "", "", "", "", ""])
const inputs = ref<HTMLInputElement[]>([])
const error_message = ref("")
const passwordVisible = ref<boolean>(false)
const user_id = localStorage.getItem("logged_user_id") as unknown as number
const form = ref({
    password: "",
    email: "",
})

const sendCode = async () => {
    await apiAuth("delete_account")
}

const confirm2FA = async () => {
    error_message.value = ""
    const formattedCode = code.value.join("") // Join code digits as a string

    await apiUser.delete(
        user_id,
        {
            token: formattedCode,
            email: form.value.email,
            password: form.value.password,
        },
    ).then((response) => {
        if (response.status == "success") {
            localStorage.removeItem("Token")
            router.push("/login")
        } else {
            error_message.value = response.message
        }
    })
}

const onPaste = (event: ClipboardEvent): void => {
    event.preventDefault()
    const pasteData = event.clipboardData?.getData("text") || ""
    const digits = pasteData.split("").slice(0, 6) // Extract the pasted digits
    digits.forEach((digit, index) => {
        if (!isNaN(Number(digit))) {
            code.value[index] = digit
        }
    })
}

// Handle input
const onInput = (index: number) => {
    if (code.value[index].length === 1 && index < code.value.length - 1) {
        inputs.value[index + 1].focus()
    }
}

// Handle backspace
const onBackspace = (index: number) => {
    if (code.value[index] === "" && index > 0) {
        inputs.value[index - 1].focus()
    }
}

const submitForm = () => {}

const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value
}

onMounted(async () => {
    sendCode()
})
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <template #start>
          <IonButtons>
            <IonBackButton />
          </IonButtons>
        </template>
        <IonTitle>Delete Account</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent
      class="sign-up-content"
      :scroll-y="false"
    >
      <h1>Delete your account</h1>

      <div class="input">
        <form
          ref="form"
          @submit.prevent="submitForm"
        >
          <IonInput
            id="email"
            v-model="form.email"
            class="custom"
            type="email"
            placeholder="Email"
            error-text="Invalid email"
          />
          <IonInput
            id="password"
            v-model="form.password"
            class="custom"
            :type="passwordVisible ? 'text' : 'password'"
            placeholder="Password"
          >
            <template #end>
              <IonButton
                class="show-password"
                fill="clear"
                aria-label="Show/hide"
              
                @click="togglePasswordVisibility"
              >
                <template #icon-only>
                  <IonIcon
                  
                    :icon="eye"
                    aria-hidden="true"
                    style="font-size: 20px; vertical-align: top; padding: 0"
                  />
                </template>
              </IonButton>
            </template>
          </IonInput>
        </form>
      </div>
      <div class="verification-container">
        <div class="code-inputs">
          <input
            v-for="(digit, index) in code"
            :key="index"
            ref="inputs"
            v-model="code[index]"
            maxlength="1"
            class="code-box"
            type="text"
            inputmode="numeric"
            @input="onInput(index)"
            @paste="onPaste"
            @keydown.backspace="onBackspace(index)"
          >
        </div>
      </div>
      <div class="text-div">
        <p>You have received an email with a 6-digit code.</p>
        <br>
        <p>
          If you did not receive such an email, please chceck your spam and wait or click:
          <a
            class="try-again"
            @click="sendCode"
          >send again.</a>
        </p>
        <br>
        <p class="resend-message">
          Deleting your account will deactivate it for 30 days. After this period, your profile, data, and
          access to GymSpace will be permanently removed. This action cannot be undone.
        </p>
        <p class="error-message">
          {{ error_message }}
        </p>
      </div>
      <IonButton
        fill="solid"
        class="sign-up-button"
        @click="confirm2FA"
      >
        DELETE ACCOUNT
      </IonButton>
    </IonContent>
  </IonPage>
</template>

<style scoped>
h1 {
    margin: 5vh auto;
}

.verification-container {
    text-align: center;
}

.code-inputs {
    width: 70%;
    display: flex;
    justify-content: center;
    gap: 5px;
    margin: 20px auto;
}

.code-box {
    width: 50%;
    aspect-ratio: 1/1.5;
    text-align: center;
    font-size: 1.5rem;
    border: 2px solid #ccc;
    border-radius: 6px;
    color: #fff;
    background-color: #242424b3;
    backdrop-filter: blur(10px);
}

.code-box:focus {
    outline: none;
    border-color: #ff0;
}

.resend-message {
    color: yellow;
}

.text-div {
    padding: 0 15px;
    text-align: left;
}

.error-message {
    color: red;
    margin-top: 10px;
}

.try-again {
    color: #fff000;
    font-weight: bold;
}
</style>
