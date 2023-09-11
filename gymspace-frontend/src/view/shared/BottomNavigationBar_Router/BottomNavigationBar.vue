<script setup>
    import { RouterLink } from 'vue-router';
    import { VBtn } from 'vuetify/lib/components/index.mjs';
    import { VLayout } from 'vuetify/lib/components/index.mjs';
    import { VAvatar } from 'vuetify/lib/components/index.mjs';
    import api from '@api'

    // Problems to solve //
    // 1. po reloadu je aktivni button jiny nez stranka ke ktere je prirazen pr: aktivni button comunity ale otevreny je FYP


    let baseUrl = await api()
    const loggedInUserId = +sessionStorage.getItem('loggedInUserId')
    const renderedUserId = +sessionStorage.getItem('loggedInUserId');
    let profilePicture
    sessionStorage.setItem("renderedUserId", loggedInUserId)
    await api("userProfile", loggedInUserId).then((loggedUser) => {
                      profilePicture = `${baseUrl}${loggedUser.profile_picture}`
                      sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser) )
                      })

    await api("userProfile", renderedUserId).then((renderedUser) => {
                      sessionStorage.setItem('renderedUser', JSON.stringify(renderedUser)
                  )})

     
</script>

<template  >
  <router-view></router-view>
    <VLayout class="navbarBackground">
        <v-bottom-navigation 
          id="navbarBackground"
          color="transparent"
          v-model="value"
          

          >

            <v-btn 
              :onclick="getPath"
              :ripple="false" 
              class="no-filter" 
              id="profile"
              
            >
              <router-link class="no-filter" :to="{name: 'LoggedInUser'}">
                <VAvatar class='PFP' :image="profilePicture"></VAvatar>
              </router-link>
            </v-btn>

            <v-btn :ripple="false">
              <router-link to="/gyms">
                <img src="../../../assets/icons/club.png" alt="GymIcon">
              </router-link>
            </v-btn>

            <v-btn :ripple="false" class="no-filter">
                  <img src="../../../assets/icons/plus.png" alt="add">
            </v-btn>

            <v-btn :ripple="false">
              <routerLink to="/shop">
                <img src="../../../assets/icons/shop.svg" alt="shop">

              </routerLink>
            </v-btn>
            
            <v-btn :ripple="false">
              <RouterLink to="/foryou">
                  <img src="../../../assets/icons/for_you_page.png" alt="FYP">
              </RouterLink>
            </v-btn>

        </v-bottom-navigation>
    </VLayout>
</template>

<script>

var dict = {
  "profile": 0,
  "gyms": 1,
  "shop": 3,
  "FYP": 4,

};
 let getValue = () => {
  console.log(dict.window.location.pathname.replace(/^\/([^\/]*).*$/, '$1'))
  return dict.window.location.pathname.replace(/^\/([^\/]*).*$/, '$1')
 }



  export default {
    data: () => ({ value: Number }),


    computed: {
      color () {
        switch (getValue) {
          case 0: return 'yellow'
          case 1: return 'yellow'
          case 3: return 'yellow'
          case 4: return 'yellow'
          default: return 'white'
        }
      },
    },
  }

</script>


<style scoped>

.v-btn--selected{
  filter: brightness(0) saturate(100%) invert(68%) sepia(69%) saturate(521%) hue-rotate(15deg) brightness(108%) contrast(105%);
  background-color: transparent !important;
}

.v-btn{
  padding: 0px;
}

.no-filter{
  filter: none !important;
  flex: 1 1 auto
}

.v-btn-selected#profile v-avatar{
  border: 2px solid yellow !important;
}

#navbarBackground{
    background-image: url("./../../../assets/images/nav_background.png");
    background-color: black;
    background-position: center;
    background-size: contain;
    background-repeat: repeat-x;
  }

</style>