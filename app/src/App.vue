<template>
  <Page class="page">
    <ActionBar title="Pixit" class="action-bar">
      <ActionItem
        ios.systemIcon="16"
        ios.position="right"
        text="Logout"
        android.position="popup"
        @tap="logoutTapped"
      ></ActionItem>
    </ActionBar>
    <StackLayout>
      <Button
        text="Go to My Albums"
        class="btn btn-primary btn-rounded-sm"
        @tap="goToUserAlbums"
      />
      <Button
        text="Discover Albums"
        class="btn btn-primary btn-rounded-sm"
        @tap="goToPublicAlbums"
      />
    </StackLayout>
  </Page>
</template>

<script>
import UserAlbums from "./pages/UserAlbums.vue";
import PublicAlbums from "./pages/PublicAlbums.vue";
import { mapActions } from "vuex";
import Login from "./pages/Login.vue";

export default {
  methods: {
    ...mapActions("user", ["Logout"]),
    goToUserAlbums() {
      this.$navigateTo(UserAlbums);
    },
    goToPublicAlbums() {
      this.$navigateTo(PublicAlbums);
    },
    logoutTapped() {
      this.Logout();
      this.$navigateTo(Login);
    }
  }
};
</script>
