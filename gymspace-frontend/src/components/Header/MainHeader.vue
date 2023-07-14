<template>
  <header>
    <img src="../../assets/images/logo.png">
    <nav>
      <ul>
        <li>Tvoje mama</li>
        <li>moje mama</li>
      </ul>
    </nav>
  </header>
</template>

<script setup>

</script>

<style scoped>
 header {
  display: flex;
  width: 100vw;
  height: 5vh;
  justify-content: center;
  align-content: center;
  border: 2px dashed blue;
 }
 nav {
  border: 1px solid red;

 }
 ul {
  display: flex;
  gap: 5%;
 }
 img {
  min-width: auto;
  
 }
</style>
