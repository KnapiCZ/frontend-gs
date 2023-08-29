<script setup>
  import { VCol } from 'vuetify/lib/components/index.mjs';
  import { ref } from 'vue';
  import api from '@api';
  import { useRouter } from 'vue-router';
  const router = useRouter(); 

  let form = ref({
    username: "",
    password: "",
  })
  async function submitForm() {
    console.log(form)
    await api("getToken", form.value)
    router.go('/')
  }
</script>


<template>
    <VCol>
        <p class="welcome">WELCOME TO</p>

        <img src="../../../assets/images/logoBigWithText.png" alt="logo">
        <form @submit.prevent="submitForm">
          <input 
            id="UsernameAuth"
            type="text"
            placeholder="Username"
            v-model="form.username"
          >
          <input 
            id="PassAuth"
            type="password"
            placeholder="Password"
            v-model="form.password"
          >
          <button class="Login">Login</button>
        </form>
    
    </VCol>
</template>

<style scoped>
*{
    margin: auto;
    text-align: center;
    width: 100%;
}

img{
    margin: auto;
    width: 256px;
    
}

p{
    color:white;
    font-size: 8vw;
}

.welcome{
    margin-top: 40px;
}

input,
button{
    margin: 10px 0;
    width: 80%;
    height: 50px;
    border-radius: 10px;

}

input{
    padding: 0 10px;
    background-color: #242424;
    color: white;
    text-align: left;
}

.Login{
    background-color: #e6e109;
    color: black;
    font-size: 4vw;
    font-weight: bold;

}
</style>
