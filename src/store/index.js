import { createStore } from 'vuex';
import { fetchUserData, fetchCategories } from '@/plugins/functions';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || '',
    categories: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    CLEAR_USER_DATA(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
    },
    SET_CAT(state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        const user = await fetchUserData();
        commit('SET_USER', user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        // Optionally, you could clear user data on failure
        // commit('CLEAR_USER_DATA');
      }
    },
    async getCategories({ commit }) {
        try{
            const categories = await fetchCategories();
            commit('SET_CAT', categories);
        } catch(error) {
            //
        }
    },
    logout({ commit }) {
        commit('CLEAR_USER_DATA');
    }
  },
  getters: {
    isAuthenticated: state => !!state.token && !!state.user,
    user: state => state.user,
    categories: state => state.categories,
  },
});
