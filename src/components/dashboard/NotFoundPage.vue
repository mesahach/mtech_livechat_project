<template>
  <div class="container text-center py-5">
    <h1>404 - Not Found</h1>
    <p class="lead">The page you are looking for within the dashboard does not exist.</p>
    <router-link to="/dashboard" class="btn btn-primary mt-3">Go to Dashboard Home</router-link>
  </div>
</template>

<script setup>
// No script needed for this simple component
</script>

<style scoped>
.container {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>