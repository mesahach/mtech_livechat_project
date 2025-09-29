<template>
    <BodySection />
</template>

<script>
import BodySection from '@/components/auth/BodySection.vue';

export default {
    name: 'AuthPage',
    components: {
        BodySection,
    },
    data() {
    return {
      savedChanges: false,
    };
  },
  provide() {
    return {
      savedChanges: this.savedChanges,
    };
  },
  mounted() {
    document.body.classList.add('auth-page');
},
beforeUnmount() {
    document.body.classList.remove('auth-page');
},
}
</script>

<style scoped>
@import '@/assets/css/auth.css';
</style>