<script setup>
    import lodash from 'lodash'
    import api from '@api'
    import { VAvatar, VCol, VIcon } from 'vuetify/lib/components/index.mjs';
    import { VRow } from 'vuetify/lib/components/index.mjs';
    const props = defineProps({
      renderedUserId: Number,
    })
    function checkNull(userObject) {
      if (lodash.isEmpty(userObject)) {
        return false
      }
      else {
        return userObject
      }
    }
    function getUrl(userObject) {
      return userObject ? `${baseUrl}${userObject.profile_picture}`:``
    }
    const baseUrl = await api()
    const twoMostPopular = await api('twoMostPopular', props.renderedUserId)
    let firstUser = checkNull(twoMostPopular[0])
    let secondUser = checkNull(twoMostPopular[1])
    let firstUrl = getUrl(firstUser)
    let secondUrl = getUrl(secondUser)
</script>


<template>
    <VCol>
        <VRow v-if="firstUser" class="block">
            <img src="../../../assets/icons/community.svg">
            <p>@{{ firstUser.username }}</p> <!-- sem dat nejznamejsi dva kluby uzivatele -->
        </VRow>
        <VRow v-if="secondUser" class="block">
          <img src="../../../assets/icons/website.svg">
            <p>@{{ secondUser.username }}</p>
        </VRow>
    </VCol>
</template>

<style scoped>

img
{
    width: 20px;
    height: auto;
    aspect-ratio: 1;
    margin-right: 4px;
}
.block {
    margin-bottom: 5px;
    margin-left: 10px;
}

</style>
