<template>
  <Page class="page">
    <ActionBar title="Home" class="action-bar">
      <ActionItem
        ios.systemIcon="16"
        ios.position="right"
        text="Logout"
        android.position="popup"
        @tap="loginTapped"
      ></ActionItem>
    </ActionBar>
    <StackLayout>
      <Label text="Welcome To Pixit !" />
    </StackLayout>
  </Page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Login from "./pages/Login";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["loggedIn"])
  },
  mounted() {},
  methods: {
    ...mapActions("user", ["Logout"]),
    loginTapped() {
      this.Logout();
      this.$navigateTo(Login);
    }
  }
};
</script>
