<script setup>
    import _ from 'lodash/core'
    import api from '@api'
    import { VCol } from 'vuetify/lib/components/index.mjs';
    import { VRow } from 'vuetify/lib/components/index.mjs';
    const props = defineProps({
      renderedUserId: Number,
    })
    function checkNull(userObject) {
      if (_.isEmpty(userObject)) {
        console.log('false')
        return false
      }
      else {
      console.log(true)
        return userObject
      }
    }
    const baseUrl = await api()
    const twoMostPopular = await api('twoMostPopular', props.renderedUserId)
    let firstUser = checkNull(twoMostPopular[0])
    let secondUser = checkNull(twoMostPopular[1])
    let firstUrl = `${baseUrl}${twoMostPopular[0].profile_picture}`
    let secondUrl = `${baseUrl}${twoMostPopular[1].profile_picture}`
</script>


<template>
    <VCol>
        <VRow v-if="firstUser" class="block">
            <img :src="firstUrl" alt="clubICO">
            <p>@{{ firstUser.username }}</p> <!-- sem dat nejznamejsi dva uzivatele z following -->
        </VRow>
        <VRow v-if="secondUser" class="block">
            <img :src="secondUrl" alt="feedICO">
            <p>@{{ secondUser.username }}</p>
        </VRow>
    </VCol>
</template>

<style scoped>

.block img
{
    width: 20px;
    margin-right: 4px;
}
.block {
    margin-bottom: 5px;
    margin-left: 10px;
}

</style>
