<script setup>
  import { VCard } from 'vuetify/lib/components/index.mjs';
  import { VTabs } from 'vuetify/lib/components/index.mjs';
  import { VTab } from 'vuetify/lib/components/index.mjs';
  import { VWindow } from 'vuetify/lib/components/index.mjs';
  import { VWindowItem } from 'vuetify/lib/components/index.mjs'; 
  import SliderFyp from '../components/SliderFYP.vue'
</script>

<template>
    <VCard>
      <VTabs
        v-model="tab"
        color="white"
        bg-color="#00000000"
        align-tabs="center"
        :grow="true"
      >
        <VTab :value="0" title="Following">Following</VTab>
        <VTab :value="1" title="FOR YOU">FOR YOU</VTab>
        <VTab :value="2" title="CLUB">CLUB</VTab>

      </VTabs>
      <VWindow v-model="tab" v-theme>
        <VWindowItem>
            <SliderFyp/>
        </VWindowItem>        
        <VWindowItem>
            <SliderFyp />
        </VWindowItem>  
        <VWindowItem>
            <SliderFyp />
        </VWindowItem>  
      </VWindow>
    </VCard>
</template>


<script>
    export default {
      data: () => ({
        tab: null,
        posts: [
          {type: 'img', source: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Example_of_modern_internet_meme.jpg'},
          {type: 'img', source: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Example_of_modern_internet_meme.jpg'},
          {type: 'img', source: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Example_of_modern_internet_meme.jpg'},
        ]
      }),
    }
</script>

<style scoped>
.v-window-item--active{
  height: 100vh;
  overflow: hidden;

}

.v-tabs  {  
  position: absolute !important;
  background-color: transparent;
  color: white;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 5;
  box-shadow: 0 0 10 red;
}


</style>