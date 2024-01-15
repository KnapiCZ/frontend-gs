<script setup lang="ts">
import { IonButton } from '@ionic/vue';


const props = defineProps({
	type: String,
	link: String,
	name: String,
})

</script>

<template>
	<IonButton color="transparent">
		<img v-if="props.type === 'email'" src="../../../../assets/icons/mail.svg" alt="email">
		<img v-if="props.type === 'web'" src="../../../../assets/icons/web.svg" alt="web">
		<p>{{ props.name }}</p>
	</IonButton>
</template>

<style scoped>
ion-button {
	width: auto;
	height: 60px;
	margin: 10px 30px;
	border-radius: 10px;
	background-color: #2C2C2C;
	color: white;

}

img {
	width: 15%;
	color: white;
	position: absolute;
	left: 10px;
	margin: auto;
}

p {
	font-weight: bold !important;

}
</style>