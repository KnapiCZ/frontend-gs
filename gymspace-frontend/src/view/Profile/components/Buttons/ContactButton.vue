<script setup lang="ts">
import { VCard, VDialog } from 'vuetify/lib/components/index.mjs';
import SocialMedia from './SocialMedia.vue';
import LinkButton from "./LinkButton.vue";
import { userDataStore } from '@/stores/UserDataStore';

const userStore = userDataStore()
let social = [] as string[]
let types = [] as string[]
let data = JSON.parse(userStore.user)
data = data.contacts.split("\r\n")

social.push(data[3])
social.push(data[4])
data.splice(2, 2)

for (let i = 0; i < data.length; i++) {
	data.splice(data.indexOf(''), 1)
}

for (let i = 0; i < data.length; i++) {
	if (data[i].match(
		/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
	)) types.push("email")
	else if (data[i].match(/^\+420 ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$|^[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/)) types.push("tel")
	else types.push("web")
}

</script>

<template>
	<button class="profile-button">
		Contact
		<VDialog activator="parent" :persistent="false" transition="dialog-bottom-transition" :scrollable="false"
			width="80vw" height="70vh">
			<VCard>
				<p>CONTACTS</p>
				<LinkButton v-for="(link, index) in data" :type="types[index]" :link="link" :name="link" />
				<SocialMedia v-if="social.length > 0" class="social" :social="social! as unknown as undefined" />
			</VCard>
		</VDialog>
	</button>
</template>

<style scoped>
.v-card {
	margin: auto;
	width: 80vw;
	height: 70vh;
	border-radius: 20px !important;
	background-color: rgba(14, 14, 14, 0.815);
	color: white;
	backdrop-filter: blur(8px);
}

p {
	font-size: 28px;
	font-weight: bold;
	margin: 20px auto
}

.social {
	width: 100%;
	position: absolute;
	bottom: 30px;



}
</style>