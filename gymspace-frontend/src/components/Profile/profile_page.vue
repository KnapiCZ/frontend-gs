<script setup>
  import profile_top from './profile_top.vue';
  import profile_buttons from './profile_buttons.vue';
  import profile_basic_info from './profile_basic_info.vue';
</script>

<template>
  <div class="page-div"> 
    <profile_top />
    <profile_basic_info />
    <profile_buttons />
    
  </div>
</template>


<style scoped>
.page-div{
  text-align: center;
}
</style>