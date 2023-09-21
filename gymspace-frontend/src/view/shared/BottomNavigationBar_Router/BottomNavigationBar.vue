<script setup>
    import { VBtn } from 'vuetify/lib/components/index.mjs';
    import { VLayout } from 'vuetify/lib/components/index.mjs';
    import { VAvatar } from 'vuetify/lib/components/index.mjs';
    import api from '@api'

    // Problems to solve //
    // 1. po reloadu je aktivni button jiny nez stranka ke ktere je prirazen pr: aktivni button comunity ale otevreny je FYP
    // po loginu to stejne

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
          mandatory="force"
          >
            <v-btn 
              :ripple="false" 
              class="no-filter" 
              id="profile"
              :to="{name: 'user', params: { userhandle: 'admin'}}"
              :exact="true"

            >
                <VAvatar class='PFP' :image="profilePicture"></VAvatar>
            </v-btn>

            <v-btn 
              :ripple="false" 
              :exact="true"
              to="/community"
              >
                <img src="../../../assets/icons/community.svg" alt="GymIcon">
            </v-btn>

            <v-btn 
              :ripple="false" 
              class="no-filter"
              >
                  <img src="../../../assets/icons/plus.png" alt="add">
            </v-btn>

            <v-btn 
              :ripple="false" 
              :exact="true"
              to="/shop"
              >
              <img src="../../../assets/icons/shop.svg" alt="shop">
            </v-btn>
            
            <v-btn 
              :ripple="false" 
              to="/foryou"
              :exact="true"
              >
              <img src="../../../assets/icons/for_you.svg" alt="FYP">
            </v-btn>

        </v-bottom-navigation>
    </VLayout>
</template>


<script>
  export default {
    data: () => ({ value: 4}),
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

.v-btn--selected#profile .v-avatar{
  border: 2px solid yellow !important;
}

#profile .v-avatar{
  border: 2px solid transparent !important;
}

#navbarBackground{
    background-color: black;
    background-position: center;
    background-size: contain;
    background-repeat: repeat-x;
  }

</style>