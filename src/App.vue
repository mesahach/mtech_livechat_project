<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  // Apply theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Fetch user data if authenticated
  if (store.getters.isAuthenticated) {
    store.dispatch('fetchUser');
  }
});
</script>

<style>
/* Global styles can go here if needed */
</style>