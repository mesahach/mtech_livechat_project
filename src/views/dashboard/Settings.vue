<template>
  <div>
    <div class="pagetitle">
      <h1>Settings</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/dashboard">Dashboard</router-link></li>
          <li class="breadcrumb-item active">Settings</li>
        </ol>
      </nav>
    </div>

    <section class="section">
      <div class="card">
        <div class="card-body pt-3">
          <!-- Bordered Tabs -->
          <ul class="nav nav-tabs nav-tabs-bordered">
            <li class="nav-item">
              <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
            </li>
            <li class="nav-item">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Settings</button>
            </li>
            <li class="nav-item">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
            </li>
          </ul>
          <div class="tab-content pt-2">
            <div class="tab-pane fade show active profile-edit pt-3" id="profile-edit">
              <!-- Profile Edit Form -->
              <form @submit.prevent="handleUpdateProfile">
                <div class="row mb-3">
                  <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                  <div class="col-md-8 col-lg-9">
                    <img :src="profileData.profile_picture || 'https://i.pravatar.cc/300'" alt="Profile">
                    <div class="pt-2">
                      <a href="#" class="btn btn-primary btn-sm" title="Upload new profile image"><i class="bi bi-upload"></i></a>
                      <a href="#" class="btn btn-danger btn-sm" title="Remove my profile image"><i class="bi bi-trash"></i></a>
                    </div>
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Full Name</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="fullName" type="text" class="form-control" id="fullName" v-model="profileData.name">
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="Email" class="col-md-4 col-lg-3 col-form-label">Email</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="email" type="email" class="form-control" id="Email" v-model="profileData.email">
                  </div>
                </div>

                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>
              </form><!-- End Profile Edit Form -->
            </div>

            <div class="tab-pane fade pt-3" id="profile-settings">
              <!-- Settings Form -->
              <form @submit.prevent="handleUpdateSettings">
                 <div class="row mb-3">
                  <label class="col-md-4 col-lg-3 col-form-label">Theme</label>
                  <div class="col-md-8 col-lg-9">
                     <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="themeToggle" :checked="isDarkMode" @change="toggleTheme">
                        <label class="form-check-label" for="themeToggle">{{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}</label>
                      </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-md-4 col-lg-3 col-form-label">Notifications</label>
                  <div class="col-md-8 col-lg-9">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="newChat" v-model="settingsData.notifications.new_chat">
                      <label class="form-check-label" for="newChat">
                        New chat notifications
                      </label>
                    </div>
                     <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="agentStatus" v-model="settingsData.notifications.agent_status">
                      <label class="form-check-label" for="agentStatus">
                        Agent status changes
                      </label>
                    </div>
                  </div>
                </div>
                 <div class="row mb-3">
                    <label for="tags" class="col-md-4 col-lg-3 col-form-label">Skill Tags</label>
                    <div class="col-md-8 col-lg-9">
                        <vue3-tags-input :tags="settingsData.tags" @on-tags-changed="newTags => settingsData.tags = newTags" />
                    </div>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>
              </form><!-- End settings Form -->
            </div>

            <div class="tab-pane fade pt-3" id="profile-change-password">
              <!-- Change Password Form -->
              <form @submit.prevent="handleChangePassword">
                <div class="row mb-3">
                  <label for="currentPassword" class="col-md-4 col-lg-3 col-form-label">Current Password</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="password" type="password" class="form-control" id="currentPassword" v-model="passwordData.current_password">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New Password</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="newpassword" type="password" class="form-control" id="newPassword" v-model="passwordData.new_password">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="renewPassword" class="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="renewpassword" type="password" class="form-control" id="renewPassword" v-model="passwordData.confirm_password">
                  </div>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Change Password</button>
                </div>
              </form><!-- End Change Password Form -->
            </div>
          </div><!-- End Bordered Tabs -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { axiosv1 } from '@/plugins/axios';
import { notify } from '@/plugins/functions';
import Vue3TagsInput from 'vue3-tags-input';

const store = useStore();
const user = computed(() => store.getters.user);

const isDarkMode = ref(document.documentElement.getAttribute('data-theme') === 'dark');

const profileData = ref({ name: '', email: '', profile_picture: '' });
const passwordData = ref({ current_password: '', new_password: '', confirm_password: '' });
const settingsData = ref({
    notifications: { new_chat: true, agent_status: false },
    tags: ['support', 'sales']
});

onMounted(() => {
  if (user.value) {
    profileData.value = { ...user.value };
  } else {
    store.dispatch('fetchUser').then(() => {
        profileData.value = { ...store.getters.user };
    });
  }
});

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  const theme = isDarkMode.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

const handleUpdateProfile = async () => {
  try {
    const response = { status: 200, data: { message: 'Profile updated successfully!', user: profileData.value } };
    if (response.status === 200) {
      store.commit('SET_USER', response.data.user);
      notify(response.data.message, 'success');
    }
  } catch (error) {
    notify('Failed to update profile.', 'error');
  }
};

const handleUpdateSettings = async () => {
    try {
        const response = { status: 200, data: { message: 'Settings updated successfully!' } };
        if(response.status === 200) {
            notify(response.data.message, 'success');
        }
    } catch (error) {
        notify('Failed to update settings.', 'error');
    }
};

const handleChangePassword = async () => {
    if(passwordData.value.new_password !== passwordData.value.confirm_password) {
        notify('Passwords do not match.', 'error');
        return;
    }
    try {
        const response = { status: 200, data: { message: 'Password changed successfully!' } };
        if(response.status === 200) {
            notify(response.data.message, 'success');
            passwordData.value = { current_password: '', new_password: '', confirm_password: '' };
        }
    } catch (error) {
        notify('Failed to change password.', 'error');
    }
};

</script>

<style scoped>
.profile-edit img {
  max-width: 120px;
}
</style>