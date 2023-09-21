<script setup>
  import Landing from './view/shared/Landing/LandingPage.vue';
</script>

<template>
    <Suspense>
      <template #default>
        <main>
          <Landing />
        </main>
      </template>

      <template #fallback>
        <h1>loading</h1>
      </template>
    </Suspense>
</template>



<style>

main,
#app {
  min-width: 100vw;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  background-color: transparent;
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
