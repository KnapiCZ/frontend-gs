<script setup> 
 const postInfo = defineProps(['ImageSource', 'postID'])
</script>



<template>
    <button class="Thumbnail"> <!-- ROUTE tag-->
      <img src="https://placehold.co/600x400/EEE/31343C" alt=""> <!-- API thubnail of post src-->
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

<script>

export default {
    data: () => ({}),
    }

</script>

