import store from "./store/index";
// import VueDevtools from 'nativescript-vue-devtools'
import Vue from "nativescript-vue";
import App from "./src/App";
import Login from "./src/pages/Login";
import axios from "axios";
import * as firebase from "nativescript-plugin-firebase";
const appSettings = require("tns-core-modules/application-settings");

// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "http://3d5c18ae.ngrok.io";
// if(TNS_ENV !== 'production') {
//   Vue.use(VueDevtools, { host: '192.168.1.71' })
// }

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
    Login
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
