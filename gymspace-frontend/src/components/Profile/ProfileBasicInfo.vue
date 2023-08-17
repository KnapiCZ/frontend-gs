<script setup>
import ProfileFollowing from './ProfileFollowing.vue'

let props = defineProps({
  description: String,
  email: String,
  })

</script>

<template>
  <div class="profile_info">
    <p>{{ props.description }}<br>@gymbeamcz kód: MARTIN5 <br>{{ props.email }}</p> <!--API user bio-->
    <ProfileFollowing />
  </div>
</template>

<style scoped>

.profile_info{
  text-align: left;
  margin: 40px 20px 20px 20px;
  display: grid;
  grid-template-columns: 60% 40%;
  font-size: 12px;
}

</style>
