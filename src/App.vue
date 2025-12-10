<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue"
</script>

<template>
  <Suspense>
    <template #default>
      <main>
        <IonApp>
          <IonRouterOutlet />
        </IonApp>
      </main>
    </template>

    <template #fallback>
      <h1>loading</h1>
    </template>
  </Suspense>
</template>
