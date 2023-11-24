<script setup lang="ts">
import { IonMenu, IonContent, IonTitle, IonHeader, IonToolbar } from '@ionic/vue';

</script>

<template>
    <IonMenu type="overlay" menu-id="user-menu" content-id="user">
        <IonToolbar>
            <IonHeader>
                <IonTitle> Settings </IonTitle>
            </IonHeader>
        </IonToolbar>
        <IonContent>
            <button> <img src="../../../assets/icons/bell.svg"> Your Account </button>
            <button> <img src="../../../assets/icons/comments.svg"> Liked</button>
            <button> <img src="../../../assets/icons/checkmark.svg"> Privacy</button>
            <button> <img src="../../../assets/icons/community.svg"> Notifications</button>
            <button> <img src="../../../assets/icons/Liked.svg"> Log out</button>
        </IonContent>
    </IonMenu>
</template>

<style scoped>
ion-content {
    height: fit-content;
    font-size: large;

}

button {
    width: 100%;
    height: 50px;
    text-align: left;
    padding-left: 20px;
    border-bottom: 1px #808080 solid;

}

img {
    height: 50%;
    margin: 10px 20px;
    vertical-align: middle;

}
</style>