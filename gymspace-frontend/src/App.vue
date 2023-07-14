<script setup>

import APICaller from './components/API/APICaller.vue'


</script>

<template>
  <Header />


  <main>
    <APICaller />
  </main>
</template>



<style>

#app {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  padding: 0;
  margin: 0;
}
body {
  margin: 0;
  padding: 0;
}
</style>
