<script setup>
  import { ref, computed } from 'vue';
  import { useFetch } from '@vueuse/core'
  import profile_top from './profile_top.vue';
  import profile_buttons from './profile_buttons.vue';
  import profile_basic_info from './profile_basic_info.vue';
  
  const userId = ref(2)
    const url = computed(() => {
    return `http://127.0.0.1:8000/api/users/${userId.value}`;
  });

  //const url = ref("http://127.0.0.1:8000/api/users/"+userId)
  const { data } = await useFetch(url, {
  refetch: true,
}).json()
  console.log(data)
</script>
<template>  
  <div class="page-div"> 
    
    <profile_top />
    <profile_basic_info :description="data.description" :email="data.email"/>
    <profile_buttons />
    
  </div>
</template>

<style scoped>
.page-div{
  text-align: center;
}
</style>
