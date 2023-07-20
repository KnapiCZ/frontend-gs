<script setup>

import APICaller from './components/API/APICaller.vue'
import bottom_navigation_bar from './components/bottom_navigation_bar.vue';
import profile_page from './components/Profile/profile_page.vue';

</script>

<template>
  <main>
    <profile_page />
    <bottom_navigation_bar />
  </main>

</template>



<style>

#app {
  min-width: 100vw;
  min-height: 100%;
  display: flex;
  padding: 0;
  margin: 0;
}


body {
  margin: 0;
  padding: 0;
}
</style>
