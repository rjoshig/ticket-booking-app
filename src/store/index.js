import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    status: null,
    error: null,
    isAuthenticated: false,
    userRegistrationDialog: false,
    userRegistrationSubmitButtonLoading: false,
    userLoginDialog: false,
    userLoginSubmitButtonLoading: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    removeUser(state) {
      state.user = null;
    },

    setStatus(state, payload) {
      state.status = payload;
    },

    setError(state, payload) {
      state.error = payload;
    },

    setUserRegistrationDialog(state, payload) {
      state.userRegistrationDialog = payload;
    },
    setUserLoginDialog(state, payload) {
      state.userLoginDialog = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setUserRegistrationSubmitButtonLoading(state, payload) {
      state.userRegistrationSubmitButtonLoading = payload;
    },

    setUserLoginSubmitButtonLoading(state, payload) {
      state.userLoginSubmitButtonLoading = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    signUpAction({ commit }, payload) {
      commit('setUserRegistrationSubmitButtonLoading', true);
      //commit('setStatus', 'loading');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          // alert('success');

          // response will have user
          // user will have uid will be updated to the state
          commit('setUser', response.user.uid);
          // commit('setStatus', 'success');
          commit('setError', null);
          commit('setUserRegistrationSubmitButtonLoading', false);
          commit('setUserRegistrationDialog', false);
        })
        .catch(error => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
          commit('setUserRegistrationSubmitButtonLoading', false);

          console.log(error);
        });
    },

    signInAction({ commit }, payload) {
      commit('setUserLoginSubmitButtonLoading', true);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          // alert('success login');
          commit('setIsAuthenticated', true);
          commit('setUser', response.user.uid);
          commit('setStatus', 'success');
          commit('setError', null);
          commit('setUserLoginSubmitButtonLoading', false);
          commit('setUserLoginDialog', false);
          router.push('/');
        })
        .catch(error => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
          commit('setUserLoginSubmitButtonLoading', false);
          commit('setIsAuthenticated', false);
          console.log(error);
        });
    },

    signOutAction({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(response => {
          commit('setUser', null);
          commit('setStatus', 'success');
          commit('setError', null);
          commit('setIsAuthenticated', false);
        })
        .catch(error => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
          commit('setIsAuthenticated', false);
        });
    },

    userRegistrationDialogAction({ commit }, payload) {
      commit('setUserRegistrationDialog', payload);
    },

    userLoginDialogAction({ commit }, payload) {
      commit('setUserLoginDialog', payload);
    }
  },

  getters: {
    status(state) {
      return state.status;
    },

    user(state) {
      return state.user;
    },

    error(state) {
      return state.error;
    }
    // userRegistrationDialog(state) {
    //   return state.userRegistrationDialog;
    // }
  }
});
