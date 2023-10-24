<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonButton, useIonRouter } from '@ionic/vue';
import api from '@/logic/API/apiCaller';
const router = useIonRouter()

let confirmedUser: { log: string }

await api('confirmAuth').then((confirm) => {
  confirmedUser = confirm
}).catch((error) => { console.log(error) })

if (confirmedUser!.log != 'not logged in') {
  sessionStorage.setItem('loggedInUserId', confirmedUser!.log)
}
else {
  router.navigate('/login')
}

let baseUrl = await api()
const loggedInUserId = +sessionStorage.getItem('loggedInUserId')!
let profilePicture: string
sessionStorage.setItem("renderedUserId", (loggedInUserId as unknown as string))
await api("userProfile", loggedInUserId).then((loggedUser) => {
  console.log(loggedUser)
  profilePicture = `${baseUrl}${loggedUser.profile_picture}`
  sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser))
})

</script>

<template>
  <IonPage class="ion-no-padding">
    <IonTabs class="ion-no-padding">
      <IonRouterOutlet></IonRouterOutlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="user" class="no-filter" :href="'/user/' + loggedInUserId">
          <img id="profile" class="no-filter" :src="profilePicture" />
        </ion-tab-button>

        <ion-tab-button tab="community" href="/community/">
          <img src="../../../assets/icons/community.svg" alt="">
        </ion-tab-button>

        <ion-button tab="plus" color="transparent">
          <img src="../../../assets/icons/plus.png" alt="">
        </ion-button>

        <ion-tab-button tab="shop" href="/community/">
          <img src="../../../assets/icons/shop.svg" alt="">
        </ion-tab-button>

        <ion-tab-button tab="forYou" href="/foryou/">
          <img src="../../../assets/icons/for_you.svg" alt="">
        </ion-tab-button>
      </ion-tab-bar>
    </IonTabs>
  </IonPage>
</template>


<script lang="ts">
export default {
  data: () => ({ value: 4 }),
}


</script>


<style scoped>
.tab-selected {
  filter: brightness(0) saturate(100%) invert(68%) sepia(69%) saturate(521%) hue-rotate(15deg) brightness(108%) contrast(105%);
  background-color: transparent !important;
}

.no-filter {
  filter: none !important;
}

#profile {
  height: 70%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid transparent !important;
}

.tab-selected #profile {
  border: 2px solid yellow !important;
}
</style>