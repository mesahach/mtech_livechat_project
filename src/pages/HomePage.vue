<template>
  <div class="homepage">
    <!-- Header -->
    <header class="header">
      <nav class="container">
        <a href="#" class="logo">LiveChat</a>
        <ul class="nav-links">
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Resources</a></li>
          <li><router-link to="/auth">Log in</router-link></li>
          <li><router-link to="/auth" class="btn btn-primary">Get Started</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container text-center">
        <h1>The New Standard in Customer Communication</h1>
        <p class="lead">
          Elevate your customer support and engagement with our all-in-one live chat solution.
        </p>
        <div class="cta-buttons">
          <router-link to="/auth" class="btn btn-primary btn-lg">Start for Free</router-link>
          <a href="#" class="btn btn-outline-primary btn-lg">Watch Demo</a>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-4">
            <div class="feature-item">
              <i class="bi bi-chat-dots-fill"></i>
              <h3>Live Chat</h3>
              <p>Engage with your website visitors in real-time to provide instant support and drive sales.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-item">
              <i class="bi bi-robot"></i>
              <h3>AI-Powered Chatbots</h3>
              <p>Automate responses to common questions and qualify leads 24/7, even when your agents are offline.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-item">
              <i class="bi bi-ticket-detailed-fill"></i>
              <h3>Help Desk</h3>
              <p>Manage all your customer conversations from different channels in one unified inbox.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container text-center">
        <p>&copy; 2024 LiveChat. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// No script needed for this simple component
</script>

<style scoped>
@import '@/assets/css/homepage.css';
</style>