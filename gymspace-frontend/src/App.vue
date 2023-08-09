<script setup>
  import BottomNavigationBar from './components/BottomNavigationBar_Router/BottomNavigationBar.vue';
  import GymMainPage from './components/Gyms/GymMainPage.vue';
</script>

<template #default>
    <Suspense>
      <main>
        <GymMainPage />
        <BottomNavigationBar />
      </main>
    </Suspense>
</template>



<style>

main,
#app {
  min-width: 100vw;
  min-height: 100%;
  padding: 0;
  margin: 0;
}

#app{
  display: flex;
}


body {
  margin: 0;
  padding: 0;
}
</style>