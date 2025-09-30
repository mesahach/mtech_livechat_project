<template>
<!-- Sign Up Pane -->
<div class="tab-pane fade show active" id="signup" role="tabpanel" aria-labelledby="signup-tab">
    <BForm @submit.prevent="submitFinalForm" floating>
<div class="row">
    <!-- First Name -->
    <BFormFloatingLabel 
    label="First Name"
    label-for="firstName"
    :invalid-feedback="errors.firstName"
    :state="errors.firstName ? true : false"
    class="mb-2 col-6"
    >
      <BFormInput 
      v-model="formData.firstName" 
      id="firstName" 
      placeholder="Enter First Name"
      class="border rounded" 
      required 
      />
      <BFormInvalidFeedback 
      :state="errors.firstName ? true : false"
      v-if="errors.firstName"
      >{{ errors.firstName }}</BFormInvalidFeedback>
    </BFormFloatingLabel>
    <!-- Last Name -->
    <BFormFloatingLabel 
    label="Last Name"
    label-for="lastName"
    :invalid-feedback="errors.lastName"
    :state="errors.lastName ? true : false"
    class="mb-2 col-6"
    >
      <BFormInput 
      v-model="formData.lastName" 
      id="lastName" 
      placeholder="Enter Last Name"
      class="border rounded" 
      required 
      />
      <BFormInvalidFeedback 
      :state="errors.lastName ? true : false"
      v-if="errors.lastName"
      >{{ errors.lastName }}</BFormInvalidFeedback>
    </BFormFloatingLabel>
</div>
    <!-- Email -->
    <BFormFloatingLabel 
    label="Organization Email e.\g example@\domain.\com"
    label-for="emailAddr"
    :invalid-feedback="errors.email"
    :state="errors.email ? true : false"
    class="mb-2"
    >
      <BFormInput 
      v-model="formData.email" 
      id="emailAddr" 
      placeholder="example@domain.com"
      type="email" 
      class="border rounded" 
      required 
      />
      <BFormInvalidFeedback 
      :state="errors.email !== null ? true : false"
      v-if="errors.email"
      >{{ errors.email }}</BFormInvalidFeedback>
    </BFormFloatingLabel>

    <!-- Phone -->
    <BFormFloatingLabel 
    label="Phone Number (Optional)"
    label-for="phone"
    :invalid-feedback="errors.phone"
    :state="errors.phone ? true : false"
    class="mb-2"
    >
      <BFormInput 
      v-model="formData.phone" 
      id="phone" 
      placeholder="Enter Phone Number"
      inputType="tel" 
      class="border rounded" 
      required="false" 
      />
      <BFormInvalidFeedback 
      :state="errors.phone ? true : false"
      v-if="errors.phone"
      >{{ errors.phone }}</BFormInvalidFeedback>
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

    <!-- Confirm Password -->
    <BFormFloatingLabel 
    label="Confirm Password"
    label-for="c_password"
    :invalid-feedback="errors.c_password"
    :state="errors.c_password ? true : false"
    class="input-group mb-2"
    >
      <BFormInput 
      v-model="formData.c_password" 
      id="c_password" 
      placeholder="Confirm Password"
      :type="showPassword ? 'text' : 'password'" 
      class="border rounded" 
      required 
      />
      <span class="input-group-text">
        <i class="bi bi-eye-slash" @click="togglePassword" v-if="showPassword"></i>
        <i class="bi bi-eye" @click="togglePassword" v-else></i>
      </span>
      <BFormInvalidFeedback 
      :state="errors.c_password ? true : false"
      v-if="errors.c_password"
      >{{ errors.c_password }}</BFormInvalidFeedback>
    </BFormFloatingLabel>
    
    <!-- result -->
    <div 
    v-if="formResult.message" 
    :class="['alert', formResult.type === 'success' ? 'alert-success' : 'alert-danger']" 
    v-html="formResult.message"
    ></div>
    
    <div class="mb-3">
    <div class="g-recaptcha" :data-sitekey="recaptchaSiteKey"></div>
    <div v-if="errors.recaptcha" class="text-danger mt-1 small">{{ errors.recaptcha }}</div>
    </div>

      <BButton 
      @click="submitFinalForm" 
      class="btn btn-primary w-100 auth-btn"
      >
    <div class='loading-indicator' v-if='isLoading'>
        <div class='spinner-border text-white' role='status'>
            <span class='visually-hidden'>Loading...</span>
        </div>
    </div>
    <span v-else>Register</span>
    </BButton>
    </BForm>
</div>
</template>

<script>
import { 
    BButton, 
    BForm, 
    BFormFloatingLabel, 
    BFormInput, 
    BFormInvalidFeedback 
} from 'bootstrap-vue-next';
import { 
    validateRegisterForm,
    registerUser
} from '@/plugins/validateFunctions';
import { notify, loadStoredGoogleKeys, showConfirm } from '@/plugins/functions';

export default {
    name: 'RegisterPage',
    components: {
        BButton,
        BForm,
        BFormFloatingLabel,
        BFormInput,
        BFormInvalidFeedback
    },
    inject: ['savedChanges'],
    data() {
        return {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            recaptchaSiteKey: null,
            showPassword: false,
            formData: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                c_password: '',
                recaptcha: null,
            },
            isLoading: false,
            errors: {
                firstName: null,
                lastName: null,
                email: null,
                phone: null,
                password: null,
                c_password: null,
                recaptcha: null,
            },
            formResult: {
                type: '',
                message: ''
            },
        };
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
    async submitFinalForm() {
      this.savedChanges = true;
      const isValid = validateRegisterForm(
        this.formData,
        (newErrors) => { this.errors = newErrors; }
      );

    if (!isValid) {
      console.log(this.errors);
      notify("Please correct the form errors before proceeding.", "warning");
      return;
    }
    const payload = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      email: this.formData.email,
      phone: this.formData.phone,
      password: this.formData.password,
      c_password: this.formData.c_password,
      timeZone: this.timeZone
    };

    await registerUser(
      payload,
      (newErrors) => { this.errors = newErrors; },
      (state) => { this.isLoading = state; },
      (result) => { this.formResult = result; }
    ).then((e) => {
      this.savedChanges = true;
      if(e){
        this.$router.push('/auth/login');
        notify("You can now login.", "success");
      }
    });
  },
    },
    async mounted() {
    this.recaptchaSiteKey = "6LddNFQgAAAAAHZFINN4vcR01rTNnyQdc-D4IL-h";
    await loadStoredGoogleKeys(this.recaptchaSiteKey);
},
  async beforeRouteLeave(to, from, next) {
    if (to.name !== 'register') {
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
  async beforeRouteUpdate(to, from, next) {
    this.recaptchaSiteKey = "6LddNFQgAAAAAHZFINN4vcR01rTNnyQdc-D4IL-h";
    await loadStoredGoogleKeys(this.recaptchaSiteKey);
    next();
  },
  onRouteEnter(to, from, next) {
    console.log("onRouteEnter");
    this.recaptchaSiteKey = "6LddNFQgAAAAAHZFINN4vcR01rTNnyQdc-D4IL-h";
    loadStoredGoogleKeys(this.recaptchaSiteKey);
    next();
  }
}
</script>

<style scoped>
@import '@/assets/css/auth.css';
</style>