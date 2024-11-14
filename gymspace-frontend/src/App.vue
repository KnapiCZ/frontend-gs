<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<template>
	<Suspense>
		<template #default>
			<main>
				<ion-app>
					<IonRouterOutlet />
				</ion-app>
			</main>
		</template>

		<template #fallback>
			<h1>loading</h1>
		</template>
	</Suspense>
</template>

<style>
* {
	margin: 0;
	padding: 0;
}

main,
#app {
	min-width: 100vw;
	min-height: 100vh;
	padding: 0;
	margin: 0;
	background-color: transparent;
}

#app {
	display: flex;
}


body {
	margin: 0;
	padding: 0;
}

h1 {
	text-align: center;
	font-size: 42px;
	margin: 100px auto;
}
</style>
