<script setup>
    import { VBtn } from 'vuetify/lib/components/index.mjs';
    import { VLayout } from 'vuetify/lib/components/index.mjs';
    import { VAvatar } from 'vuetify/lib/components/index.mjs';
</script>

<template  >
  <router-view></router-view>
    <VLayout>
        <v-bottom-navigation bg-color="#000000">
            <v-btn value="Profile">
              <router-link to="/">
                <VAvatar class='PFP' image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNXlxKTKx1BNyefNbP7zji3RNu15aKD6sPAFqJNDUTLpDUSzHyNnQ4L_fraxsAO6mw28&usqp=CAU"></VAvatar>
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
