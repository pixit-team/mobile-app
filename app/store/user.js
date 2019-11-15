import axios from "axios";
import * as firebase from "nativescript-plugin-firebase";
const appSettings = require("tns-core-modules/application-settings");

export default {
  state: {
    user: null,
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
      // TODO Set appSettings
      state.user = user;
      state.token = token;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
    }
  },
  actions: {
    async Login({ commit }, credentials) {
      try {
        const res = await axios.post("/auth/local/login/", credentials);
        if (res.status === 200) {
          console.log("Login OK ! : ", res);

          commit("SET_USER", res.data);
        }
      } catch (error) {
        console.log("Error : ", error);
        //TODO Toast
      }
    },
    async Register({ dispatch }, credentials) {
      const firebaseToken = await firebase.getCurrentPushToken();
      try {
        const res = await axios.post("/auth/local/register/", {
          ...credentials,
          firebaseToken
        });
        if (res.status === 201) {
          console.log("Hooray : ", res);
          return await dispatch("Login", credentials);
        }
      } catch (error) {
        console.log("Error : ", error);
        // TODO Error Toast
      }
    }
  },
  namespaced: true
};
