<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonCol, IonInput, IonPage, useIonRouter } from '@ionic/vue';
import apiAuth from '@/logic/API/apiAuth';

const router = useIonRouter();
const error_message = ref(' ')
const form = ref({
	username_or_email: "",
	password: "",
});


const submitForm = async () => {
	if (form.value.username_or_email != "" && form.value.password != "") {

		await apiAuth("getToken", JSON.stringify(form.value)).then((response) => {
			if (response.status == "success") {
				localStorage.setItem("Token", response.data.token);
				localStorage.setItem("logged_user_id", response.data.user_id);
				router.push("/waiting-screen");
			} else {
				error_message.value = response.error[0]
			}
		})
	} else {
		error_message.value = "Username/Email and Password can`t be empty"
	}
}

//TODO: improve styling bigger touch area

</script>


<template>
	<IonPage>
		<IonCol>
			<h1 class="welcome">WELCOME TO</h1>

			<img class="logo" src="\src\assets\images\gs_logo.png" alt="logo">
			<form @submit.prevent="submitForm">
				<IonInput id="UsernameAuth" class="custom border-gradient" type="text" placeholder="Username or Email"
					v-model="form.username_or_email" />
				<IonInput id="PassAuth" class="custom border-gradient" type="password" placeholder="Password"
					v-model="form.password" />
				<p class="error-message">{{ error_message }}</p>

				<IonButton class="login" @click="submitForm()">Login</IonButton>
			</form>
			<a class="sign-up" href="/step-1">NEW? SIGN-UP HERE</a>
			<a class="sign-up" href="https://support.gymspace.app/password_reset/">FORGOTEN PASSWORD</a>


			<!--
			<IonButton class="login-by-other" color="transparent"><img class="sign-img"
					src="../../../assets/icons/apple.svg" alt="">Sign-in with
				apple</IonButton>
			<IonButton class="login-by-other" color="transparent"><img class="sign-img"
					src="../../../assets/icons/google.svg" alt="">Sign-in with
				google</IonButton>
			-->
		</IonCol>
	</IonPage>
</template>

<style scoped>
* {
	margin: auto;
	text-align: center;
	width: 100%;
}

.logo {
	margin: auto;
	width: 60%;

}

h1 {
	color: white;
	font-size: 8vw;
}

.welcome {
	margin-top: 40px;
}

ion-button.login {
	background-color: #fff000;
	color: black;
	font-size: 1rem;
	font-weight: bold;
	margin: 25px;
	width: 87%;
	height: 50px;
	border-radius: 6px;
	--background: transparent;
}

ion-input.border-gradient::before {
	background: linear-gradient(165deg,
			#fff 4%,
			#ffffff75 52%,
			#ffffff59 80%),
		#fff00021;
}

.login-by-other {
	font-weight: bold;
	background-color: white;
	color: black;
}

.sign-img {
	width: 40px;
	height: 40px;
	margin: 20px 10px;
}

.sign-up {
	padding: 20px 15px;
	margin: 20px 0px;
}
</style>
