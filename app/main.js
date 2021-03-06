import store from "./store/index";
// import VueDevtools from 'nativescript-vue-devtools'
import Vue from "nativescript-vue";
import App from "./src/App";
import Login from "./src/pages/Login";
import Camera from "./src/pages/Camera";
import axios from "axios";
import * as firebase from "nativescript-plugin-firebase";
const appSettings = require("tns-core-modules/application-settings");

axios.defaults.baseURL = "https://pixit-api.herokuapp.com/";

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === "production";

Vue.registerElement(
  "RadSideDrawer",
  () => require("nativescript-ui-sidedrawer").RadSideDrawer
);

// Get User from appSettings and set the store
let userIsLoggedIn = false;
const userInAppSettings = appSettings.getString("user");
const tokenInAppSettings = appSettings.getString("token");
if (userInAppSettings && tokenInAppSettings) {
  userIsLoggedIn = true;
  store.dispatch("user/SetUserData", {
    user: JSON.parse(userInAppSettings),
    token: tokenInAppSettings
  });
}

new Vue({
  store,
  components: {
    App,
    Login,
    Camera
  },
  created() {
    firebase
      .init({
        showNotifications: true,
        showNotificationsWhenInForeground: true,
        onPushTokenReceivedCallback: token => {},
        onMessageReceivedCallback: message => {}
      })
      .then(() => {})
      .catch(error => {});
  },
  template: `
      <Frame>
      <${userIsLoggedIn ? "App" : "Login"} />
      </Frame>`
}).$start();
