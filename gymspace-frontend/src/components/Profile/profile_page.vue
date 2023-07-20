<script setup>
  import profile_top from './profile_top.vue';
  import profile_buttons from './profile_buttons.vue';
  import profile_basic_info from './profile_basic_info.vue';
  import Tabbar_main from './tab_bar_pages/tabbar_main.vue';
</script>

<template>
  <div class="page-div"> 
    <profile_top />
    <profile_basic_info />
    <profile_buttons />
    <Tabbar_main />
  </div>
</template>


<style scoped>
.page-div{
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>