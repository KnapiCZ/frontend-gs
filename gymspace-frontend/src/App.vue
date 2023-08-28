<script setup>
  import LogIn from './view/shared/BottomNavigationBar_Router/BottomNavigationBar.vue';
</script>

<template>
    <Suspense>
      <template #default>
        <main>
          <LogIn />
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
  min-width: 100%;
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
