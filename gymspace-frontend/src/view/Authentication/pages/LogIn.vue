<script setup>
 import { VCol } from 'vuetify/lib/components/index.mjs';

</script>


<template>
    <VCol>
        <p class="welcome">WELCOME TO</p>

        <img src="../../../assets/images/logoBigWithText.png" alt="logo">
        <input id="EmailAuth" type="text" placeholder="Username/E-mail">
        <input id="PassAuth" type="password" placeholder="Password">
        <button class="Login">Login</button>
    
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