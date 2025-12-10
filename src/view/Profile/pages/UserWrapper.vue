<script setup lang="ts">
import { IonPage } from "@ionic/vue"
import { ref, watch } from "vue"

import router from "@/router"

import GenericUser from "./GenericUser.vue"

const renderedUserId = ref(router.currentRoute.value.params.id as unknown as number)

watch(
    () => router.currentRoute.value.params.id,
    (newId) => {
        renderedUserId.value = newId as unknown as number
    },
)
</script>

<template>
  <IonPage class="ion-no-padding">
    <GenericUser
      :key="renderedUserId"
      :rendered-user="renderedUserId"
    />
  </IonPage>
</template>
