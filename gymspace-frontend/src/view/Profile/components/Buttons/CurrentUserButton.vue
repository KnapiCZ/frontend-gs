<script setup lang="ts">

import ContactButton from './ContactButton.vue';

</script>


<template>
  <div class="hello">
    <button class="profileButtons">
      Edit
    </button>

    <button class="profileButtons">
      Share
    </button>
    <ContactButton></ContactButton>

  </div>
</template>
  
  
<style scoped>
.profileButtons {
  display: inline-block;
  padding: 5px auto;
  margin: 10px 10px;
  width: 25%;
  height: 30px;
  background-color: rgb(47, 47, 47);
  font-weight: bold;
  border-radius: 5px;
}
</style>


