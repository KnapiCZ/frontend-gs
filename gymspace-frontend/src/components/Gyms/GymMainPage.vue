<script setup>
    import { VCombobox } from 'vuetify/lib/components/index.mjs';
    import GymButton from './GymButton.vue';
    import Thumbnail from '../Post/Thubnail.vue'
</script>

<template>
    <VCombobox
      label="Search"
      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      variant='outlined'
    />
    <h2>Your Gyms</h2>
    <GymButton v-for="(gym, index) in gyms" :key="index" :title="gym.title" :ImageSRC="gym.ImageSRC"/>
    
    <h2>Featured posts  </h2>
    <div id="thumbnailContainer">
      <Thumbnail v-for="(thumnail) in thumnails" :key="thumnail" ImageSource="https://upload.wikimedia.org/wikipedia/commons/c/cf/Example_of_modern_internet_meme.jpg" />
    </div>
</template>

<script>
  export default {
    data: () => ({
        thumnails: ['id1', 'id2', 'id3'],
        gyms: [
          {ImageSRC: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNXlxKTKx1BNyefNbP7zji3RNu15aKD6sPAFqJNDUTLpDUSzHyNnQ4L_fraxsAO6mw28&usqp=CAU', title: 'Gymspace'},
          {ImageSRC: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNXlxKTKx1BNyefNbP7zji3RNu15aKD6sPAFqJNDUTLpDUSzHyNnQ4L_fraxsAO6mw28&usqp=CAU', title: 'Suprajs'},
          {ImageSRC: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNXlxKTKx1BNyefNbP7zji3RNu15aKD6sPAFqJNDUTLpDUSzHyNnQ4L_fraxsAO6mw28&usqp=CAU', title: 'HAHA  '},
          {ImageSRC: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNXlxKTKx1BNyefNbP7zji3RNu15aKD6sPAFqJNDUTLpDUSzHyNnQ4L_fraxsAO6mw28&usqp=CAU', title: 'BRUHHHH'}
        ]    
      }),
  }
</script>

<style scoped>

.v-combobox{
  width: auto;
  margin: 20px;
}

h2{
  margin: 20px;
  font-weight: bold;
}

#thumbnailContainer{
  margin: auto 20px;
  display: flex;                  /* establish flex container */
  justify-content: space-between; /* switched from default (flex-start, see below) */
}
</style>