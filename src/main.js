import { createApp } from 'vue';
import App from './App.vue';
import { createHead } from '@unhead/vue/client';
import router from './router';
import store from './store';

// const {VITE_NODE_ENV, VITE_GA_ID} = import.meta.env;

// 1. Core Styles and Scripts (Bootstrap and SweetAlert2)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// 2. SweetAlert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// 3. Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
    faUser, 
    faHome, 
    faEnvelope, 
    faPhoneVolume, 
    faMapMarkerAlt, 
    faComment, 
    faLocationDot,
    faClock,
    faUsers,
    faArrowCircleLeft,
    faArrowCircleRight,
    faMoon,
    faSun,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faUser, 
    faHome, 
    faEnvelope, 
    faPhoneVolume, 
    faMapMarkerAlt, 
    faComment, 
    faLocationDot,
    faClock,
    faUsers,
    faArrowCircleLeft,
    faArrowCircleRight,
    faMoon,
    faSun,
);

// 4. Custom Global Styles
// import './assets/css/style.css';
// import './assets/css/light-theme.css';

// 5. Create Vue App and Head instance
const app = createApp(App);
const head = createHead();

// 6. Use Plugins (including the head instance)
app.use(head);
app.use(VueSweetalert2);
app.component('font-awesome-icon', FontAwesomeIcon);

// 7. Use Axios
// app.config.globalProperties.$axiosv0 = axiosv0;
// app.config.globalProperties.$axiosv1 = axiosv1;
// app.config.globalProperties.$axiosv2 = axiosv2;

// 8. Mount the app
app.use(store);
app.use(router);
app.mount('#app');
