<script setup>
  import BottomNavigationBar from './components/BottomNavigationBar_Router/BottomNavigationBar.vue';
</script>

<template>
    <Suspense>
      <template #default>
        <main>
          <BottomNavigationBar />
        </main>
      </template>

      <template #fallback>
        <p id='load'>loading</p>
      </template>
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
#load {
  font-size: 100px;
}
</style>
