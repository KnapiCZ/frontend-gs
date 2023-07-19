<script setup>
    import { VBottomNavigation } from 'vuetify/lib/components/index.mjs';
    import { VBtn } from 'vuetify/lib/components/index.mjs';
    import { VLayout } from 'vuetify/lib/components/index.mjs';
    import { VImg } from 'vuetify/lib/components/index.mjs';
</script>

<template  >
    <VLayout>
        <v-bottom-navigation>
            <v-btn value="Profile">
                <VImg image="../assets/images/profile_image.png" />
                
            </v-btn>

            <v-btn value="Gyms">
                Gyms
            </v-btn>

            <v-btn value="Add">
                Add
            </v-btn>    

            <v-btn value="Shop">
                Shop
            </v-btn>
            
            <v-btn value="FYP">
                FYP
            </v-btn>
        </v-bottom-navigation>
    </VLayout>
</template>

<style scoped>

</style>