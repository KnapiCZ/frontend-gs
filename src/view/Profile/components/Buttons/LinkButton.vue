<script setup lang="ts">
import { IonButton } from "@ionic/vue"

const props = defineProps({
    type: String,
    link: String,
    name: String,
})
let url = props.link

if (props.type != "web") {
    url = props.type + "to://" + props.link
}
</script>

<template>
  <a
    :href="url"
    target="_blank"
  >
    <IonButton color="transparent">
      <img
        v-if="props.type === 'email'"
        src="../../../../assets/icons/mail.svg"
        alt="email"
      >
      <img
        v-if="props.type === 'tel'"
        src="../../../../assets/icons/bell.svg"
        alt="tel"
      >
      <img
        v-if="props.type === 'web'"
        src="../../../../assets/icons/web.svg"
        alt="web"
      >
      <p>{{ props.name }}</p>
    </IonButton>
  </a>
</template>

<style scoped>
a {
    width: 90%;
    height: 60px;
    margin: 10px 30px;
}

ion-button {
    width: 90%;
    height: 60px;
    border-radius: 10px;
    background-color: #2c2c2c;
    color: white;
}

img {
    height: 90%;
    aspect-ratio: 1;
    color: white;
    position: absolute;
    left: 10px;
}

p {
    font-weight: bold !important;
    position: absolute;
    left: 50px;
}
</style>
