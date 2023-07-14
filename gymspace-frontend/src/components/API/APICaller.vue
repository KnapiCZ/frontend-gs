<template>
  <div>
    <h1>Total Vue Packages: {{ data }}</h1>
  </div>
</template>

<script>
export default {
  name: 'FetchExample',
  data() {
    return {
      data: null,
    };
  },
  async created() {
    try {
    // GET request using fetch with async/await
    const response = await fetch('http://127.0.0.1:8000/api/users/2');
    const data = await response.json();
    this.data = data;
    } catch (error) {
      console.log( 'ERROR: ', error)
    }
  },
};
</script>
