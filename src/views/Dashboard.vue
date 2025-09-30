<template>
  <div class="dashboard-layout">
    <Sidebar />
    <div class="main-content">
      <Navbar />
      <main id="main">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/dashboard/Sidebar.vue';
import Navbar from '@/components/dashboard/Navbar.vue';
import '@/assets/css/dashboard.css';
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s;
}

@media (max-width: 992px) {
  .main-content {
    margin-left: 0;
  }
}
</style>