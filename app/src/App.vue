<template>
  <Page class="page" @loaded="onLoaded">
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
      <Button text="Go to My Albums" @tap="goToUserAlbums" />
    </StackLayout>
  </Page>
</template>

<script>
import UserAlbums from "./pages/UserAlbums.vue";

export default {
  methods: {
    goToUserAlbums() {
      this.$navigateTo(UserAlbums);
    }
  }
};
</script>
