export default {
  state: {
    user: {
      mail: "pierre.said@epitech.eu"
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    }
  },
  mutations: {
    setUser({ state }, user) {
      state.user = user;
    }
  },
  namespaced: true
};
