<script setup>
    import { VBtn } from 'vuetify/lib/components/index.mjs';
    import { VLayout } from 'vuetify/lib/components/index.mjs';
    import { VAvatar } from 'vuetify/lib/components/index.mjs';
    import api from '@api'


    const loggedInUserId = 1;
    const renderedUserId = 2;
    let loggedUser
    sessionStorage.setItem("loggedInUserId", loggedInUserId)
    sessionStorage.setItem("renderedUserId", renderedUserId)
    await api("userProfile", loggedInUserId).then((loggedUser) => {
                      sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser) )
                      }).then(loggedUser = JSON.parse(sessionStorage.getItem('loggedUser')));

    await api("userProfile", renderedUserId).then((renderedUser) => {
                      sessionStorage.setItem('renderedUser', JSON.stringify(renderedUser)
                  )})
    let baseUrl = await api()

    let profilePicture = `${baseUrl}${loggedUser.profile_picture}`
</script>

<template  >
  <router-view></router-view>
    <VLayout>
        <v-bottom-navigation bg-color="#000000">
            <v-btn value="Profile">
              <router-link to="/">
                <VAvatar class='PFP' :image="profilePicture"></VAvatar>
              </router-link>
            </v-btn>

            <v-btn value="Gyms">
              <router-link to="/gyms">
                <img src="../../assets/icons/club.png" alt="GymIcon">
              </router-link>
            </v-btn>

            <v-btn value="Add">
                <img src="../../assets/icons/plus.png" alt="add">
            </v-btn>    

            <v-btn value="Shop">
                <img src="../../assets/icons/shop.png" alt="shop">
            </v-btn>
            
            <v-btn value="FYP">
                <img src="../../assets/icons/for_you_page.png" alt="FYP">
            </v-btn>
        </v-bottom-navigation>
    </VLayout>
</template>

<style scoped>
v-bottom-navigation{
    background-color: aqua;
}

</style>
