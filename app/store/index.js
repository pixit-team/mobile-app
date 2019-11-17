import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from "./user";
import userAlbums from "./userAlbums";
import publicAlbums from "./publicAlbums";

export default new Vuex.Store({
  modules: {
    user,
    userAlbums,
    publicAlbums
  },
  state: {},
  mutations: {},
  actions: {},
  strict: true
});
