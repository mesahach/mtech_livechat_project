<template>
  <div>
    <div class="pagetitle">
      <h1>Profile</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/dashboard">Dashboard</router-link></li>
          <li class="breadcrumb-item active">Profile</li>
        </ol>
      </nav>
    </div>

    <section class="section profile">
      <div class="row">
        <div class="col-xl-4">
          <div class="card">
            <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
              <img :src="profileData.profile_picture || 'https://i.pravatar.cc/300'" alt="Profile" class="rounded-circle">
              <h2>{{ profileData.name }}</h2>
              <h3>{{ profileData.role }}</h3>
            </div>
          </div>
        </div>

        <div class="col-xl-8">
          <div class="card">
            <div class="card-body pt-3">
              <!-- Bordered Tabs -->
              <ul class="nav nav-tabs nav-tabs-bordered">
                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                </li>
                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                </li>
                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                </li>
              </ul>
              <div class="tab-content pt-2">
                <div class="tab-pane fade show active profile-overview" id="profile-overview">
                  <h5 class="card-title">Profile Details</h5>
                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Full Name</div>
                    <div class="col-lg-9 col-md-8">{{ profileData.name }}</div>
                  </div>
                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Email</div>
                    <div class="col-lg-9 col-md-8">{{ profileData.email }}</div>
                  </div>
                   <div class="row">
                    <div class="col-lg-3 col-md-4 label">Role</div>
                    <div class="col-lg-9 col-md-8">{{ profileData.role }}</div>
                  </div>
                </div>

                <div class="tab-pane fade profile-edit pt-3" id="profile-edit">
                  <!-- Profile Edit Form -->
                  <form @submit.prevent="handleUpdateProfile">
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

const store = useStore();
const user = computed(() => store.getters.user);

const profileData = ref({
  name: '',
  email: '',
  role: '',
  profile_picture: ''
});

const passwordData = ref({
    current_password: '',
    new_password: '',
    confirm_password: ''
});

onMounted(() => {
  if (user.value) {
    profileData.value = { ...user.value };
  } else {
    // Fetch user data if not available in store
    store.dispatch('fetchUser').then(() => {
        profileData.value = { ...store.getters.user };
    });
  }
});

const handleUpdateProfile = async () => {
  try {
    // This is a mock API call, replace with your actual endpoint
    // const response = await axiosv1.post('/update-profile', profileData.value);

    //Simulating a successful response
    const response = { status: 200, data: { message: 'Profile updated successfully!', user: profileData.value } };

    if (response.status === 200) {
      store.commit('SET_USER', response.data.user);
      notify(response.data.message, 'success');
    }
  } catch (error) {
    console.error('Failed to update profile:', error);
    notify('Failed to update profile. Please try again.', 'error');
  }
};

const handleChangePassword = async () => {
    if(passwordData.value.new_password !== passwordData.value.confirm_password) {
        notify('New password and confirm password do not match.', 'error');
        return;
    }

    try {
        // This is a mock API call, replace with your actual endpoint
        // const response = await axiosv1.post('/change-password', passwordData.value);

        //Simulating a successful response
        const response = { status: 200, data: { message: 'Password changed successfully!' } };

        if (response.status === 200) {
            notify(response.data.message, 'success');
            passwordData.value = { current_password: '', new_password: '', confirm_password: '' };
        }
    } catch (error) {
        console.error('Failed to change password:', error);
        notify('Failed to change password. Please try again.', 'error');
    }
};
</script>

<style scoped>
.profile .profile-card img {
  max-width: 120px;
}
.profile .label {
  font-weight: 600;
  color: rgba(var(--text-color-rgb), 0.6);
}
</style>