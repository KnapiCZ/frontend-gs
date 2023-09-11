<script setup>
  import { VCard } from 'vuetify/lib/components/index.mjs';
  import { VTabs } from 'vuetify/lib/components/index.mjs';
  import { VTab } from 'vuetify/lib/components/index.mjs';
  import { VWindow } from 'vuetify/lib/components/index.mjs';
  import { VWindowItem } from 'vuetify/lib/components/index.mjs'; 
  import SliderFyp from '../../Post/components/SliderFYP.vue'
</script>

<template>
    <VCard>
      <VTabs
        v-model="tab"
        color="white"
        bg-color="#00000000"
        align-tabs="center"
      >
        <VTab :value="Following" title="Following">Following</VTab>
        <VTab :value="FYP" title="FOR YOU">FOR YOU</VTab>
        <VTab :value="CLUB" title="CLUB">CLUB</VTab>

      </VTabs>
      <VWindow v-model="tab" v-theme>
        <VWindowItem>
            <SliderFyp/>
        </VWindowItem>        
        <VWindowItem>
            <SliderFyp
            v-for="(post) in posts"
            :type="post.type"
            :source="post.source"
            />
        </VWindowItem>  
        <VWindowItem>
            <SliderFyp
            v-for="(post) in posts"
            :type="post.type"
            :source="post.source"
            />
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
  overflow: auto;
  -webkit-scroll-snap-type: y mandatory;
      -ms-scroll-snap-type: y mandatory;
          scroll-snap-type: y mandatory;
}

.v-tabs  {  
  position: absolute !important;
  background-color: transparent;
  color: white;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 5;

}


</style>