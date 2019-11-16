import axios from "axios";
import * as firebase from "nativescript-plugin-firebase";
const appSettings = require("tns-core-modules/application-settings");

const userInAppSettings = appSettings.getString("user");

export default {
  state: {
    user: userInAppSettings ? userInAppSettings : null,
    token: appSettings.getString("token")
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
      // TODO Set appSettings
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
    async Logout({ commit }) {
      commit("LOGOUT");
    },
    async Login({ commit }, credentials) {
      const res = await axios.post("/auth/local/login/", credentials);
      if (res.status === 200) {
        commit("SET_USER", res.data);
      }
    },
    async Register({ dispatch }, credentials) {
      const firebaseToken = await firebase.getCurrentPushToken();
      const res = await axios.post("/auth/local/register/", {
        ...credentials,
        firebaseToken
      });
      if (res.status === 201) {
        console.log("Hooray : ", res);
        return await dispatch("Login", credentials);
      }
    }
  },
  namespaced: true
};
