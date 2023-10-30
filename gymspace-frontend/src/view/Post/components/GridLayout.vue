<script setup lang="ts">
import Thumbnail from './thumbnail.vue';
import json from '../../../assets/mocs/profilepost.json'

</script>


<template>
  <div class="grid-container">
    <Thumbnail v-for="data in myJson" :ImageSource="data.thumbSRC" :postID="data.id" :postIndex="data.id"
      class="grid-item" />
  </div>
</template>


<script lang="ts">
export default {
  data: () => ({
    myJson: json,
  }),
}
</script>

<style>
.grid-container {
  display: grid;
  width: 100%;
  grid-template-columns: auto auto auto;
}

.grid-item {
  text-align: center;
  aspect-ratio: 0.5;
  object-fit: cover;
  width: fit-content;
  margin: 5px;

}

@media screen and (min-width: 1200px) {
  .grid-container {
    display: grid;
    width: 30%;
    grid-template-columns: auto auto auto;
  }


}
</style>
