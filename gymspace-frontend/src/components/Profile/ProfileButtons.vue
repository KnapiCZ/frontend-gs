<template>
    <div class="hello">
      <button class="profileButtons" @click="isFollowing = !isFollowing">{{ isFollowing ? 'Following' : 'Follow' }}</button>
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

  <script>
  export default {
  data() {
    return {
      isFollowing: false, //API sleduji uzivatele xxxx?
    };
  },
};

</script>