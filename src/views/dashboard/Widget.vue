<template>
  <div>
    <div class="pagetitle">
      <h1>Chat Widget</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/dashboard">Dashboard</router-link></li>
          <li class="breadcrumb-item active">Widget</li>
        </ol>
      </nav>
    </div>

    <section class="section">
      <div class="row">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Copy Widget Script</h5>
              <p>
                To install the chat widget on your website, copy the following script
                and paste it just before the closing <code>&lt;/body&gt;</code> tag of your HTML.
              </p>

              <div class="widget-script-container">
                <pre><code>{{ widgetScript }}</code></pre>
                <button class="btn btn-primary btn-sm copy-btn" @click="copyWidgetScript">
                  <i class="bi bi-clipboard"></i> Copy
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Widget Preview</h5>
              <div class="widget-preview">
                <div class="chat-bubble">
                  <i class="bi bi-chat-dots-fill"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { notify } from '@/plugins/functions';

const store = useStore();
const user = computed(() => store.getters.user);

const widgetScript = ref(
  `<script>
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://your-chat-server.com/widget.js?token=${user.value?.api_key || 'YOUR_API_KEY'}';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'live-chat-widget'));
<\/script>`
);

const copyWidgetScript = () => {
  navigator.clipboard.writeText(widgetScript.value)
    .then(() => {
      notify('Widget script copied to clipboard!', 'success');
    })
    .catch(err => {
      notify('Failed to copy script. Please copy it manually.', 'error');
      console.error('Failed to copy text: ', err);
    });
};
</script>

<style scoped>
.widget-script-container {
  position: relative;
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 15px;
}

[data-theme="dark"] .widget-script-container {
    background-color: #333;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
}

.copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.widget-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: #f1f1f1;
  border-radius: 5px;
}

[data-theme="dark"] .widget-preview {
  background-color: #2c2c2c;
}

.chat-bubble {
  width: 60px;
  height: 60px;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
</style>