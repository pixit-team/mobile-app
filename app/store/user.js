import * as firebase from "nativescript-plugin-firebase";
import axios from "axios";
const appSettings = require("tns-core-modules/application-settings");

export default {
  state: {
    user: null,
    token: null
  },
  getters: {
    user(state) {
      return state.user;
    },
    loggedIn(state) {
      return state.token !== undefined && state.token !== null;
    }
  },
  mutations: {
    SET_USER(state, { user, token }) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      appSettings.setString("token", token);
      appSettings.setString("user", JSON.stringify(user));
      state.user = user;
      state.token = token;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      appSettings.remove("token");
      appSettings.remove("user");
    }
  },
  actions: {
    async SetUserData({ commit }, credentials) {
      commit("SET_USER", credentials);
    },
    async Login({ commit }, credentials) {
      const res = await axios.post("/auth/local/login/", credentials);
      if (res.status === 200) {
        commit("SET_USER", res.data);
      }
    },
    async Logout({ commit, dispatch }) {
      commit("LOGOUT");
      dispatch("publicAlbums/Reset", {}, { root: true });
      dispatch("userAlbums/Reset", {}, { root: true });
    },
    async Register({ dispatch }, credentials) {
      const firebaseToken = await firebase.getCurrentPushToken();
      const res = await axios.post("/auth/local/register/", {
        ...credentials,
        firebaseToken
      });
      if (res.status === 201) {
        return await dispatch("Login", credentials);
      }
    }
  },
  namespaced: true
};
