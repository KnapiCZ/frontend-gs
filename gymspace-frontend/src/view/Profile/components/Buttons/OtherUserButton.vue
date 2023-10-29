<script setup lang="ts">
import api from '@/logic/API/apiCaller';
import ContactButton from './ContactButton.vue';
import { ref } from 'vue';
import { useStore } from '@/stores/store';

let loggedInUserId = +sessionStorage.getItem('loggedInUserId')!
let followingList = await api('isFollowing', loggedInUserId, 2)

const isFollowing = ref()
const store = useStore()

function following(followers: []) {
  if (followers.includes(loggedInUserId as never)) {
    isFollowing.value = true;
  }
  else {
    isFollowing.value = false;
  }
}

async function follow() {
  if (isFollowing.value) {
    store.count--
  } else {
    store.count++

  }
  await api("follow",
    loggedInUserId,
    2).then((isFollowing.value as any) = (!isFollowing.value as any))
}

following(followingList.followers)
</script>

<template>
  <div class="hello">
    <button id="followButton" class="profileButtons" @click="follow">
      {{ isFollowing ? 'Following' : 'Follow' }}
    </button> <!-- vytvorit api na follow -->
    <ContactButton></ContactButton>

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

.active {
  background-color: yellow;
}
</style>


