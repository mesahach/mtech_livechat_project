<template>
    <!-- Sign In Pane -->
<div class="tab-pane fade show active" id="signin" role="tabpanel" aria-labelledby="signin-tab">
<!-- <form class="text-start mt-4"> -->
    <BForm @submit.prevent="submitFinalForm" floating>
    <!-- Email -->
    <BFormFloatingLabel 
    label="Customer Email"
    label-for="email"
    :invalid-feedback="errors.email"
    :state="errors.email ? true : false"
    class="mb-2"
    >
      <BFormInput 
      v-model="formData.email" 
      id="email" 
      placeholder="Enter Customer Email"
      type="email" 
      class="border rounded" 
      required 
      />
      <BFormInvalidFeedback 
      :state="errors.email ? true : false"
      v-if="errors.email"
      >{{ errors.email }}</BFormInvalidFeedback>
    </BFormFloatingLabel>
    
    <!-- Password -->
    <BFormFloatingLabel 
    label="Password"
    label-for="password"
    :invalid-feedback="errors.password"
    :state="errors.password ? true : false"
    class="input-group mb-2"
    >
      <BFormInput 
      v-model="formData.password" 
      id="password" 
      placeholder="Enter Password"
      :type="showPassword ? 'text' : 'password'"
      class="border rounded" 
      required 
      />
      <span class="input-group-text">
        <i class="bi bi-eye-slash" @click="togglePassword" v-if="showPassword"></i>
        <i class="bi bi-eye" @click="togglePassword" v-else></i>
      </span>
      <BFormInvalidFeedback 
      :state="errors.password ? true : false"
      v-if="errors.password"
      >{{ errors.password }}</BFormInvalidFeedback>
    </BFormFloatingLabel>

     <!-- result -->
     <div 
    v-if="formResult.message" 
    :class="['alert', formResult.type === 'success' ? 'alert-success' : 'alert-danger']" 
    v-html="formResult.message"
    ></div>

      <BButton 
      @click="submitFinalForm" 
      class="btn btn-primary w-100 auth-btn"
      >
    <div class='loading-indicator' v-if='isLoading'>
        <div class='spinner-border text-white' role='status'>
            <span class='visually-hidden'>Loading...</span>
        </div>
    </div>
    <span v-else>Sign In</span>
    </BButton>
</BForm>
</div>
<BModal id="modal-area" 
    title="Authentication Page" 
    v-model="showModal"
    :no-footer="true"
    size="lg" 
    ok-only 
    no-stacking
    >
    <BForm @submit.prevent="submitAuthForm" floating class="auth-card">
    <!-- Hidden Product ID -->
    <input type="hidden" name="email" v-model="formData.email" />
    <!-- Auth Code -->
    <BFormFloatingLabel 
    label="Auth Code"
    label-for="authCode"
    :invalid-feedback="errors.authCode"
    :state="errors.authCode ? true : false"
    class="mb-2"
    >
      <BFormInput 
      v-model="formData.authCode" 
      id="authCode" 
      placeholder="Enter Auth Code"
      class="border rounded text-center big-input" 
      required 
      />
      <BFormInvalidFeedback 
      :state="errors.authCode ? true : false"
      v-if="errors.authCode"
      >{{ errors.authCode }}</BFormInvalidFeedback>
    </BFormFloatingLabel>

    <!-- result -->
    <div 
    v-if="authFormResult.message" 
    :class="['alert', 'text-center', authFormResult.type === 'success' ? 'alert-success' : 'alert-danger']" 
    v-html="authFormResult.message"
    ></div>
    
    <div class="d-flex justify-content-between mt-3">
      <BButton 
      @click="showModal = false" 
      class="btn btn-secondary"
      >Close</BButton>
      <BButton 
      @click="resendAuthCode" 
      class="btn btn-primary"
      >
    <div class='loading-indicator' v-if='isLoadingResend'>
        <div class='spinner-border text-white' role='status'>
            <span class='visually-hidden'>Loading...</span>
        </div>
    </div>
    <span v-else>Resend</span>
    </BButton>
      <BButton 
      @click="submitAuthForm" 
      class="btn btn-primary"
      >
    <div class='loading-indicator' v-if='isLoadingAuth'>
        <div class='spinner-border text-white' role='status'>
            <span class='visually-hidden'>Loading...</span>
        </div>
    </div>
    <span v-else>Authenticate</span>
    </BButton>
</div>
    </BForm>
    </BModal>
</template>

<script>
import { validateLoginForm } from '@/plugins/validateFunctions';
import { 
    BForm, 
    BFormFloatingLabel, 
    BFormInput, 
    BFormInvalidFeedback, 
    BButton,
    BModal
} from 'bootstrap-vue-next';
import { notify, showConfirm } from '@/plugins/functions';
import { login, auth, validateAuthCode, resendAuthCode } from '@/plugins/validateFunctions';

export default {
    name: 'LoginPage',
    components: {
        BForm,
        BFormFloatingLabel,
        BFormInput,
        BFormInvalidFeedback,
        BButton,
        BModal
    },
    inject: ['savedChanges'],
    data() {
        return {
            showPassword: false,
            showModal: false,
            formData: {
                email: '',
                password: '',
                authCode: '',
            },
            isLoading: false,
            isLoadingAuth: false,
            isLoadingResend: false,
            errors: {
                email: null,
                password: null,
                authCode: null,
            },
            formResult: {
                type: '',
                message: ''
            },
            authFormResult: {
                type: '',
                message: ''
            },
        };
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        toggleModal() {
            this.showModal = !this.showModal;
        },
        async submitFinalForm() {

            const isValid = validateLoginForm(
                this.formData,
                (newErrors) => { this.errors = newErrors; }
            );

            if (!isValid) {
                notify("Please correct the form errors before proceeding.", "warning");
                return;
            }
            await login({
                formData: this.formData,
                setErrors: (newErrors) => { this.errors = newErrors; },
                setLoading: (state) => { this.isLoading = state; },
                setResult: (result) => { this.formResult = result; }
            }).then((e) => {
                this.savedChanges = true;
                if (this.formResult.message === 'Email is not verified') {
                    this.showModal = true;
                } else if (e) {
                    this.$router.push('/dashboard');
                }
            });
        },
        async submitAuthForm() {
            const isValid = validateAuthCode(
                this.formData.authCode
            );
            if (isValid !== null) {
                notify(isValid, "warning");
                return;
            }
            await auth({
                formData: this.formData,
                setErrors: (newErrors) => { this.errors = newErrors; },
                setLoading: (state) => { this.isLoadingAuth = state; },
                setResult: (result) => { this.authFormResult = result; }
            }).then(() => {
                this.showModal = false;
            });
        },
        async resendAuthCode() {
            await resendAuthCode({
                formData: this.formData,
                setErrors: (newErrors) => { this.errors = newErrors; },
                setLoading: (state) => { this.isLoadingResend = state; },
                setResult: (result) => { this.authFormResult = result; }
            });
        }
    },
  async beforeRouteLeave(to, from, next) {
    if (to.name !== 'login') {
    if (!this.savedChanges) {
      await showConfirm(
        'Notice',
        'Are you sure you want to leave this page?', 
        'warning', 
        'Yes', 
        false
      ).then((result) => {
        next(result);
      });
    } else {
      next(true);
    }
    } else {
    next();
    }
  },
}
</script>

<style scoped>
@import '@/assets/css/auth.css';
</style>
