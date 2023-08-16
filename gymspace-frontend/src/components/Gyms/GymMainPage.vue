<script setup>
    import { VCombobox } from 'vuetify/lib/components/index.mjs';
    import GymButton from './GymButton.vue';
    import Thumbnail from '../Post/Thumbnail.vue'
</script>

<template>
    <VCombobox
      label="Search"
      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      variant='outlined'
      class="h-10"
    />
    <h2>Your Gyms</h2>
    <GymButton v-if="gyms != null" v-for="(gym, index) in gyms" :key="index" :title="gym.title" :ImageSRC="gym.ImageSRC"/>
    <p v-else>You are not in Gym</p>
    
    <h2>Featured posts  </h2>
    <div id="thumbnailContainer">
      <Thumbnail v-for="(thumnail) in thumnails" :key="thumnail" ImageSource="https://upload.wikimedia.org/wikipedia/commons/c/cf/Example_of_modern_internet_meme.jpg" />
    </div>
</template>

<script>
  export default {
    data: () => ({
        thumnails: ['id1', 'id2', 'id3', 'id3', 'id3', 'id3'],
        gyms: [  /*  API zatim vratit logo gymu a jeho nazev nebo null pokud v user zadnem neni  */
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
  height: 50px;
  margin: 20px;
}

h2{
  margin: 30px 20px 10px 20px;
  font-weight: bold;
}
p{
  text-align: center;
  margin: auto;
}

.Thumbnail{
  margin: auto 10px;
	scroll-snap-align: start;
	display: flex;
  flex: 0 0 30%;
}


#thumbnailContainer{
  margin: 20px;
  display: flex;                  /* establish flex container */
  overflow-x: scroll;
	scroll-snap-type: x mandatory;
  align-items: center;
}

</style>
