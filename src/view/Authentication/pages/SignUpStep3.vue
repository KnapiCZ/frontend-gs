<script setup lang="ts">
import "swiper/swiper-bundle.css"

import { IonButton, IonContent, IonInput,IonPage, useIonRouter } from "@ionic/vue"
import { onMounted,ref } from "vue"

import apiAuth from "@/logic/API/apiAuth"
import { TwoFAToken } from "@/logic/types/auth"

const router = useIonRouter()
const code = ref(["", "", "", "", "", ""])
const inputs = ref<HTMLInputElement[]>([])
const error_message = ref("")

const sendCode = async () => {
    await apiAuth.send2FA().then((response) => {
        if (response.status != "success") {
            error_message.value = response.message
        }
    })
}

const confirm2FA = async () => {
    const formattedCode: TwoFAToken = { token: code.value.join("") } // Join code digits as a string
    await apiAuth.confirm2FA(formattedCode).then((response) => {
        if (response.status == "success") {
            router.push("/step-4")
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
        inputs.value[index - 1]?.focus()
    }
}

onMounted(async () => {
    sendCode()
})
</script>

<template>
  <IonPage>
    <IonContent
      class="sign-up-content top-padding-notch"
      :scroll-y="false"
    >
      <img
        src="../../../assets/images/2FAEnvelope.png"
        class="sign-up-background-image"
        alt="Cake"
      >
      <h1 class="sign-up">
        Verify your email
      </h1>

      <div class="verification-container">
        <div class="code-inputs">
          <IonInput
            v-for="(digit, index) in code"
            :key="index"
            ref="inputs"
            v-model="code[index]"
            :maxlength="1"
            mode="ios"
            class="code-box border-gradient"
            type="text"
            inputmode="numeric"
            @input="onInput(index)"
            @paste="onPaste"
            @keydown.backspace="onBackspace(index)"
          />
        </div>
      </div>
      <div class="text-div">
        <p>You have received an email with a 6-digit code.</p>
        <br>
        <p>
          If you did not receive such an email, please chceck your spam and wait for a few minutes then
          <a
            class="try-again"
            @click="sendCode"
          >send again.</a>
        </p>
        <br>
        <p class="resend-message">
          E-mail has been sent to you!
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
        NEXT
      </IonButton>
    </IonContent>
  </IonPage>
</template>

<style scoped>
.sign-up-background-image {
    top: -60px;
}

.code-inputs {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

ion-input.code-box {
    width: 45px;
    height: 68px;
    text-align: center;
    font-size: 1.5rem;
    border-radius: 6px;
    color: #fff;
    background-color: #242424b3;
    backdrop-filter: blur(10px);
    --highlight-color-focused: #fff000;
}

.code-box:focus {
    outline: none;
}

.resend-message {
    color: yellow;
}

.text-div {
    padding: 0 15px;
    text-align: left;
}

.error-message {
    margin-top: 10px;
}

.try-again {
    color: #fff000;
    font-weight: 700;
}

ion-input.border-gradient::before {
    padding: 2px;
    background: linear-gradient(
        125deg,
        rgba(255, 255, 255, 0.35) 14%,
        rgba(255, 255, 255, 0.59) 64%,
        rgb(236, 218, 71, 0.47) 94%
    );
}
</style>
