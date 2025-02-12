<script setup lang="ts">
import { IonContent, IonPage, IonButton, useIonRouter } from "@ionic/vue"
import { ref, onMounted } from "vue";
import apiAuth from "@/logic/API/apiAuth";
import "swiper/swiper-bundle.css"



const router = useIonRouter()
const code = ref(["", "", "", "", "", ""]);
const inputs = ref([]);
const error_message = ref('')

const sendCode = async () => {
    await apiAuth("send2FA")
}



const confirm2FA = async () => {
    const formattedCode = code.value.join(""); // Join code digits as a string
    await apiAuth("confirm2FA", JSON.stringify({ "token": formattedCode })).then((response) => {
        if (response.status == "success") {
            router.push("/step-4")
        } else {
            error_message.value = response.message
        }
    })
}

const onPaste = (event: ClipboardEvent): void => {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';
    const digits = pasteData.split('').slice(0, 6); // Extract the pasted digits
    digits.forEach((digit, index) => {
        if (!isNaN(Number(digit))) {
            code.value[index] = digit;
        }
    });
};

// Handle input
const onInput = (index: number) => {
    if (code.value[index].length === 1 && index < code.value.length - 1) {
        inputs.value[index + 1].focus();
    }
};

// Handle backspace
const onBackspace = (index: number) => {
    if (code.value[index] === "" && index > 0) {
        inputs.value[index - 1]?.focus();
    }
};

onMounted(async () => {
    sendCode();
});

</script>

<template>
    <IonPage>
        <IonContent class="sign-up-content" :scroll-y="false">
            <img src="../../../assets/images/2FAEnvelope.png" class="sign-up-background-image" alt="Cake" />
            <h1 class="sign-up">Verify your email</h1>

            <div class="verification-container">
                <div class="code-inputs">
                    <input v-for="(digit, index) in code" :key="index" v-model="code[index]" maxlength="1"
                        @input="onInput(index)" @paste="onPaste" @keydown.backspace="onBackspace(index)" ref="inputs"
                        class="code-box" type="text" inputmode="numeric" />
                </div>
            </div>
            <div class="text-div">

                <p>You have received an email with a 6-digit code.</p>
                <br>
                <p>If you did not receive such an email, please chceck your spam and wait for a few minutes then
                    <a class="try-again" @click="sendCode">send again.</a>
                </p>
                <br>
                <p class="resend-message">E-mail has been sent to you!</p>
                <p class="error-message">{{ error_message }}</p>
            </div>
            <IonButton fill="solid" class="sign-up-button" @click="confirm2FA">SIGN UP</IonButton>
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

.code-box {
    width: 45px;
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
