<template>
  <Page class="page">
    <ActionBar title="Home" class="action-bar" />
    <StackLayout>
      <Button text="Go to Second" @tap="goToSecond" />
    </StackLayout>
  </Page>
</template>

<script>
import Second from "./Second";
import * as firebase from "nativescript-plugin-firebase";

export default {
  data() {
    return {};
  },
  methods: {
    goToSecond() {
      this.$navigateTo(Second);
    }
  }
  //   created() {
  //     firebase
  //       .init({
  //         showNotifications: true,
  //         showNotificationsWhenInForeground: true,

  //         onPushTokenReceivedCallback: token => {
  //           console.log("[Firebase] onPushTokenReceivedCallback:", { token });
  //         },

  //         onMessageReceivedCallback: message => {
  //           console.log("[Firebase] onMessageReceivedCallback:", { message });
  //         }
  //       })
  //       .then(() => {
  //         console.log("[Firebase] Initialized");
  //       })
  //       .catch(error => {
  //         console.log("[Firebase] Initialize", { error });
  //       });
  //   }
};
</script>
