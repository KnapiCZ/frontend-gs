<script setup lang="ts">
import { IonButton } from "@ionic/vue"
import { ref } from "vue"

import PointsComponent from "@/view/shared/components/PointsComponent.vue"

const props = defineProps<{
    description: string
    points: number
}>()

let isOpened = ref(false)
</script>

<template>
  <div class="profile_info">
    <div class="row">
      <div class="column left default-flex">
        <p
          class="closed"
          :class="{ 'opened': isOpened }"
        >
          {{ description }}
        </p>
        <p
          v-if="description != ''"
          class="show-more-less"
          @click="isOpened = !isOpened"
        >
          {{ isOpened ? "Showless" : "Show more" }}
        </p>
      </div>
      <div class="column default-flex right">
        <PointsComponent :points="props.points" />
        <div class="wrapper-button border-gradient">
          <IonButton class="default">
            Contact
          </IonButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.points-wrapper {
    margin: auto;
    margin-right: 0;
}

.profile_info {
    width: auto;
    text-align: left;
    margin: 44px 16px 12px 16px;
}

.closed {
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    transition: max-height 2s ease-in-out;
    max-height: 4.5em;
}

.opened {
    line-clamp: unset;
    -webkit-line-clamp: unset;
    max-height: 100%;
    /* Expand smoothly */
}

.show-more-less {
    color: grey;
}

.column.left {
    align-items: start;
}

.column.right {
    align-items: end;
    gap: 12px;
}

.default {
    width: 100%;
    --border-style: none --border-width: 0;
}

.wrapper-button {
    width: 80%;
    text-align: right;
    position: relative;
}
</style>
