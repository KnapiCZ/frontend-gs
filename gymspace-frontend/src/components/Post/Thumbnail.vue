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
    <button> <!-- ROUTE tag-->
      <img :src="postUrl" alt=""> <!-- API thumbnail of post src-->
    </button>
</template>

<style scoped>

img{
    max-width: 60vw;
    max-height: 40vh;
}
</style>
