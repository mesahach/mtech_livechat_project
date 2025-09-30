<template>
  <aside :class="['sidebar', { 'is-collapsed': isCollapsed }]">
    <div class="sidebar-header">
      <router-link to="/dashboard" class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
        <span v-if="!isCollapsed">Operator</span>
      </router-link>
    </div>

    <ul class="sidebar-nav">
      <li>
        <router-link to="/dashboard">
          <i class="bi bi-grid"></i>
          <span v-if="!isCollapsed">Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/settings">
          <i class="bi bi-gear"></i>
          <span v-if="!isCollapsed">Settings</span>
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/widget">
          <i class="bi bi-code-slash"></i>
          <span v-if="!isCollapsed">Widget</span>
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/profile">
          <i class="bi bi-person"></i>
          <span v-if="!isCollapsed">Profile</span>
        </router-link>
      </li>
    </ul>

    <div class="sidebar-toggle-wrapper">
      <button class="sidebar-toggle" @click="toggleSidebar">
        <i :class="isCollapsed ? 'bi bi-chevron-right' : 'bi bi-chevron-left'"></i>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: var(--sidebar-background);
  color: var(--sidebar-text-color);
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  border-right: 1px solid var(--card-border-color);
}

.sidebar.is-collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 15px;
  text-align: center;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  color: var(--sidebar-text-color);
}

.logo img {
  height: 40px;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  flex-grow: 1;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  padding: 15px 25px;
  color: var(--sidebar-text-color);
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}

.sidebar-nav a:hover,
.sidebar-nav a.router-link-exact-active {
  background-color: var(--sidebar-active-background);
  color: var(--sidebar-active-text-color);
}

.sidebar-nav a i {
  font-size: 20px;
  margin-right: 15px;
}

.sidebar.is-collapsed .sidebar-nav a i {
  margin-right: 0;
}

.sidebar.is-collapsed .sidebar-nav a {
  justify-content: center;
}

.sidebar-toggle-wrapper {
  padding: 15px;
  text-align: center;
}

.sidebar-toggle {
  background: none;
  border: 1px solid var(--card-border-color);
  color: var(--sidebar-text-color);
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>