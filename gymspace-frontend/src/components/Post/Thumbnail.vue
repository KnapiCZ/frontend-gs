<script setup>
  import api from '@api';
  const props = defineProps({
  ImageSource: String,
  postID: Number,
  })
  const baseUrl = await api()
  const postUrl = `${baseUrl}${props.ImageSource}`
</script>



<template>
    <button class="Thumbnail"> <!-- ROUTE tag-->
      <img :src="postUrl" alt=""> <!-- API thumbnail of post src-->
    </button>
</template>

<style scoped>

button{
    width: 30%;
    height: 40%;    
}
img{
    width: 100%;
    height: 100%;
}
</style>
