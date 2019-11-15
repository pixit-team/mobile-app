export default {
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user;
    },
    loggedIn(state) {
      return state.user !== null;
    }
  },
  mutations: {
    SET_USER(state, user) {
      // TODO Set Axios default headers
      // TODO Set appSettings
      state.user = user;
    },
    LOGOUT(state) {
      state.user = null;
    }
  },
  actions: {
    Register({ commit }, credentials) {
      // commit("SET_USER", user);
      console.log("I am registering : ", credentials);
    }
  },
  namespaced: true
};
