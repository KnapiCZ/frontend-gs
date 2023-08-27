<script setup>
    import { RouterLink } from 'vue-router';
    import { VBtn } from 'vuetify/lib/components/index.mjs';
    import { VLayout } from 'vuetify/lib/components/index.mjs';
    import { VAvatar } from 'vuetify/lib/components/index.mjs';
    import api from '@api'


    let baseUrl = await api()
    const loggedInUserId = 5;
    const renderedUserId = 2;
    let profilePicture
    sessionStorage.setItem("loggedInUserId", loggedInUserId)
    sessionStorage.setItem("renderedUserId", renderedUserId)
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
    <VLayout>
        <v-bottom-navigation bg-color="black">

            <v-btn>
              <router-link :to="{name: 'LogedInUser'}">
                <VAvatar class='PFP' :image="profilePicture"></VAvatar>
              </router-link>
            </v-btn>

            <v-btn>
              <router-link to="/gyms">
                <img src="../../../assets/icons/club.png" alt="GymIcon">
              </router-link>
            </v-btn>

            <v-btn>
              <RouterLink to="Add">
                  <img src="../../../assets/icons/plus.png" alt="add">
              </RouterLink>    
            </v-btn>

            <v-btn>
              <routerLink to="/shop">
                <img src="../../../assets/icons/shop.png" alt="shop">
              </routerLink>
            </v-btn>
            
            <v-btn>
              <RouterLink to="/foryou">
                  <img src="../../../assets/icons/for_you_page.png" alt="FYP">
              </RouterLink>
            </v-btn>

        </v-bottom-navigation>
    </VLayout>
</template>


