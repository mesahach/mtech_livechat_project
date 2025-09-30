<template>
  <header class="navbar">
    <div class="d-flex align-items-center">
      <button class="menu-toggle-btn me-3 d-lg-none" @click="toggleMobileSidebar">
        <i class="bi bi-list"></i>
      </button>
      <div class="search-bar">
        <input type="text" class="form-control" placeholder="Search..." />
      </div>
    </div>

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">
        <li class="nav-item">
          <a class="nav-link nav-icon" href="#" @click.prevent="toggleTheme">
            <i :class="isDarkMode ? 'bi bi-sun' : 'bi bi-moon'"></i>
          </a>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
            <i class="bi bi-bell"></i>
            <span class="badge bg-primary badge-number">4</span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
            <li class="dropdown-header">
              You have 4 new notifications
              <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li class="notification-item">
              <i class="bi bi-exclamation-circle text-warning"></i>
              <div>
                <h4>Lorem Ipsum</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>30 min. ago</p>
              </div>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li class="notification-item">
              <i class="bi bi-x-circle text-danger"></i>
              <div>
                <h4>Atque rerum nesciunt</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>1 hr. ago</p>
              </div>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li class="dropdown-footer">
              <a href="#">Show all notifications</a>
            </li>
          </ul>
        </li>

        <li class="nav-item dropdown pe-3">
          <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <img :src="user?.profile_picture || 'https://i.pravatar.cc/300'" alt="Profile" class="rounded-circle" />
            <span class="d-none d-md-block dropdown-toggle ps-2">{{ user?.name || 'Operator' }}</span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li class="dropdown-header">
              <h6>{{ user?.name || 'Operator' }}</h6>
              <span>{{ user?.role || 'Admin' }}</span>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <router-link class="dropdown-item d-flex align-items-center" to="/dashboard/profile">
                <i class="bi bi-person"></i>
                <span>My Profile</span>
              </router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <router-link class="dropdown-item d-flex align-items-center" to="/dashboard/settings">
                <i class="bi bi-gear"></i>
                <span>Account Settings</span>
              </router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item d-flex align-items-center" href="#" @click.prevent="logout">
                <i class="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const user = computed(() => store.getters.user);
const isDarkMode = ref(document.documentElement.getAttribute('data-theme') === 'dark');

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  const theme = isDarkMode.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

const logout = () => {
  store.dispatch('logout');
  router.push('/auth/login');
};

const toggleMobileSidebar = () => {
  document.body.classList.toggle('toggle-sidebar');
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: var(--navbar-background);
  box-shadow: var(--box-shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.menu-toggle-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--navbar-text-color);
}

.search-bar {
  min-width: 360px;
}

.header-nav .nav-icon {
  font-size: 22px;
  color: var(--navbar-text-color);
}

.header-nav .dropdown-menu {
  background-color: var(--card-background);
  color: var(--text-color);
  border: 1px solid var(--card-border-color);
}

.header-nav .dropdown-item {
  color: var(--text-color);
}

.header-nav .dropdown-item:hover {
  background-color: var(--sidebar-active-background);
  color: var(--sidebar-active-text-color);
}

.nav-profile img {
  width: 36px;
  height: 36px;
}
</style>