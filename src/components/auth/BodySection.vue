<template>
    <div class="auth-container">
      <!-- Header -->
      <div class="auth-header">
        <router-link to="/" class="back-to-home">
          <i class="fas fa-arrow-left me-2"></i> Back to Home
        </router-link>
        <router-link to="/" class="navbar-brand">
          <i class="fas fa-star me-2"></i>Event Spotlight
        </router-link>
      </div>
  
      <!-- Card -->
      <div class="auth-card">
        <h2 class="title-auth">Welcome</h2>
        <p>Join Africa's premier event platform</p>
  
        <!-- Nav pills -->
        <ul class="nav nav-pills auth-tabs row">
          <li class="nav-item col-6">
            <button
              class="nav-link col-12"
              :class="{ active: activeTab === 'login' }"
              @click="setTab('login')"
            >
              Sign In
            </button>
          </li>
          <li class="nav-item col-6">
            <button
              class="nav-link col-12"
              :class="{ active: activeTab === 'register' }"
              @click="setTab('register')"
            >
              Sign Up
            </button>
          </li>
        </ul>
  
        <!-- Dynamic component -->
        <div class="tab-content mt-4">
          <keep-alive>
            <component :is="currentComponent" />
          </keep-alive>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LoginPage from './LoginPage.vue';
  import RegisterPage from './RegisterPage.vue';
  
  export default {
    name: 'BodySection',
    components: { LoginPage, RegisterPage },
  
    computed: {
      activeTab() {
        // Match route name
        return this.$route.name === 'register' ? 'register' : 'login';
      },
      currentComponent() {
        return this.activeTab === 'register' ? RegisterPage : LoginPage;
      }
    },
  
    methods: {
      setTab(tab) {
        // Push to route: either /auth/login or /auth/register
        this.$router.push({ name: tab });
      }
    },
  
    watch: {
      // react to route change
      '$route.name'(newName) {
        if (!['login', 'register'].includes(newName)) {
          this.$router.replace({ name: 'login' }); // fallback
        }
      }
    },
  
    mounted() {
      if (!['login', 'register'].includes(this.$route.name)) {
        this.$router.replace({ name: 'login' }); // fallback to login
      }
    }
  };
  </script>
  
  <style scoped>
  @import '@/assets/css/auth.css';
  </style>
  