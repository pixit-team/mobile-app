import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from "./user";
import userAlbums from "./userAlbums";

export default new Vuex.Store({
  modules: {
    user,
    userAlbums
  },
  state: {},
  mutations: {},
  actions: {},
  strict: true
});
