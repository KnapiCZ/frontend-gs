<script setup>
  import api from '@api';
  import LogIn from '../../Authentication/pages/LogIn.vue';
  import BottomNavigationBar from '../BottomNavigationBar_Router/BottomNavigationBar.vue';
  let confirmedUser
  await api('confirmAuth').then((confirm) => {
    confirmedUser = confirm
  }).catch((error) => {console.log(error)})

  console.log(confirmedUser)
  if (typeof(+confirmedUser.log)=='number') {
    sessionStorage.setItem('loggedInUserId', confirmedUser.log)
  }
</script>


<template>
    <BottomNavigationBar  v-if="confirmedUser.log!='not logged in'"/>
    <LogIn v-else/>
</template>

