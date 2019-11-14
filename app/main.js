import store from "./store/index";
// import VueDevtools from 'nativescript-vue-devtools'
import Vue from "nativescript-vue";
import App from "./components/App";

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
    App
  },
  template: `
      <Frame>
          <App />
      </Frame>`
}).$start();
