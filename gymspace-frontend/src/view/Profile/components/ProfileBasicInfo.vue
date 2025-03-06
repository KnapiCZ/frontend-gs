<script setup lang="ts">
import { ref } from 'vue'
import PointsComponent from '@/view/shared/components/PointsComponent.vue'
import { IonButton, IonCol, IonRow } from '@ionic/vue'

const props = defineProps<{
    description: string
    points: number
}>()

let isOpened = ref(false)


</script>

<template>
    <div class="profile_info ">
        <IonRow>

            <IonCol :size="6">
                <p class="closed" :class="{ opened: isOpened }">
                    {{ description }} {{ description }} {{ description }}
                </p>
                <p v-if="description != ''" class="show-more-less" @click="isOpened = !isOpened">{{ isOpened ?
                    'Showless'
                    :
                    'Show more' }}</p>
            </IonCol>
            <IonCol class="right" :size="6">
                <PointsComponent :points="props.points" />
                <IonButton class="default">Contact</IonButton>
            </IonCol>

        </IonRow>
    </div>
</template>

<style scoped>
.right {
    text-align: right;
}

div.points-wrapper {
    margin: auto;
    margin-right: 0;
}

.profile_info {
    width: auto;
    text-align: left;
    margin: 50px 8px 0 8px;
}

.closed {
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    /* number of lines to show */
    -webkit-box-orient: vertical;
}

.opened {
    line-clamp: none;
    -webkit-line-clamp: none;

}

.show-more-less {
    color: grey;
}
</style>
