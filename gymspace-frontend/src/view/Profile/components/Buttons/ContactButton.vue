<script setup lang="ts">
import SocialMedia from "./SocialMedia.vue"
import LinkButton from "./LinkButton.vue"
import { IonButton } from "@ionic/vue"
import { userDataStore } from "@/stores/UserDataStore"

const userStore = userDataStore()
let social = [] as string[]
let types = [] as string[]
let data = "asdawd\r\nawdawd\r\n"
//data = data.split("\r\n")

social.push(data[3])
social.push(data[4])
data.slice(2, 2)

for (let i = 0; i < data.length; i++) {
    data.slice(data.indexOf(""), 1)
}

for (let i = 0; i < data.length; i++) {
    if (
        data[i].match(
            /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        )
    )
        types.push("email")
    else if (data[i].match(/^\+420 ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$|^[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/))
        types.push("tel")
    else types.push("web")
}
</script>

<template>
    <IonButton class="profile-button"> Contact </IonButton>
</template>

<style scoped></style>
