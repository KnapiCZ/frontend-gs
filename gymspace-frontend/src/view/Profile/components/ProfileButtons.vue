<script setup>
  import api from '@api';
  import { ref } from 'vue';

  let loggedInUserId = +sessionStorage.getItem('loggedInUserId')
  let renderedUserId = +sessionStorage.getItem('renderedUserId')
  const isFollowing = ref()
  let followingList = await api('isFollowing', loggedInUserId, renderedUserId)
  function following(followers) {
    if (followers.includes(loggedInUserId)) {
      isFollowing.value = true;
    }
    else {
      isFollowing.value = false;
    }
  }
  async function follow() {
                  await api("follow",
                      loggedInUserId,
                      renderedUserId).then(isFollowing.value = !isFollowing.value)
                                    
                  
  }
  following(followingList.followers)
</script>

<template>

    <div class="hello">
      <button
          class="profileButtons"
          @click="follow" 
        >
          {{ isFollowing ? 'Following' : 'Follow' }}
      </button> <!-- vytvorit api na follow -->

      <button class="profileButtons" @click="">Message</button>
      <button class="profileButtons" @click="">Email</button>

    </div>
  </template>
  
  
  <style scoped>
  .profileButtons {
    display: inline-block;
    padding: 5px auto;
    margin: 20px 10px;
    width: 25%;
    height: 30px;
    background-color: #2F2F2F;
    font-weight: bold;
    border-radius: 5px;
  }
  </style>


