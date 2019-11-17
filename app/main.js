import store from "./store/index";
// import VueDevtools from 'nativescript-vue-devtools'
import Vue from "nativescript-vue";
import App from "./src/App";
import Login from "./src/pages/Login";
import Camera from "./src/pages/Camera";
import axios from "axios";
import * as firebase from "nativescript-plugin-firebase";

// axios.defaults.baseURL = "http://192.168.1.71:5000";
axios.defaults.baseURL = "http://999c69cc.ngrok.io/";
// if(TNS_ENV !== 'production') {
//   Vue.use(VueDevtools, { host: '192.168.1.71' })
// }

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === "production";

Vue.registerElement(
  "RadSideDrawer",
  () => require("nativescript-ui-sidedrawer").RadSideDrawer
);

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

        onPushTokenReceivedCallback: token => {
          // console.log("[Firebase] onPushTokenReceivedCallback:", { token });
        },

        onMessageReceivedCallback: message => {
          // console.log("[Firebase] onMessageReceivedCallback:", { message });
        }
      })
      .then(() => {
        // console.log("[Firebase] Initialized");
      })
      .catch(error => {
        // console.log("[Firebase] Initialize", { error });
      });
  },
  template: `
      <Frame>
        <Camera/>
      </Frame>`
}).$start();
