<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonCol, IonPage, useIonRouter } from '@ionic/vue';
import apiAuth from '@/logic/API/apiAuth';

const router = useIonRouter();

let form = ref({
	username: "",
	password: "",
});

async function submitForm() {
	await apiAuth("getToken", form.value.username, form.value.password).then((data) => {
		localStorage.setItem("Token", data.token);
	})
	router.push('/');
}

</script>


<template>
	<IonPage>
		<IonCol>
			<p class="welcome">WELCOME TO</p>

			<img class="logo" src="../../../assets/images/gymspace_logo.svg" alt="logo">
			<form @submit.prevent="submitForm">
				<input id="UsernameAuth" type="text" placeholder="Username" v-model="form.username">
				<input id="PassAuth" type="password" placeholder="Password" v-model="form.password">
				<IonButton class="Login" color="transparent" @click="submitForm()">Login</IonButton>
			</form>
			<IonButton class="sign-up" href="/step-1">NEW? SIGN-UP HERE</IonButton>

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

p {
	color: white;
	font-size: 8vw;
}

.welcome {
	margin-top: 40px;
}

input,
ion-button {
	margin: 10px 0;
	width: 80%;
	height: 50px;
	border-radius: 10px;

}

input {
	padding: 0 10px;
	background-color: #242424;
	color: white;
	text-align: left;
}

.Login {
	background-color: #fff000;
	color: black;
	font-size: 4vw;
	font-weight: bold;

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
	margin-bottom: 50px;
}
</style>
