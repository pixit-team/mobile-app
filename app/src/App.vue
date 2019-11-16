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
    <TabView
      androidTabsPosition="bottom"
      tabBackgroundColor="black"
      selectedTabTextColor="#FFEA00"
    >
      <TabViewItem title="My albums">
        <UserAlbums ref="userAlbums" />
      </TabViewItem>
      <TabViewItem title="Discover">
        <FlexBoxLayout>
          <Label text="Bruh" />
        </FlexBoxLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Login from "./pages/Login";
import UserAlbums from "./pages/UserAlbums.vue";

export default {
  components: {
    UserAlbums
  },
  computed: {
    ...mapGetters("user", ["loggedIn"])
  },
  methods: {
    ...mapActions("user", ["Logout", "SetUserData"]),
    logoutTapped() {
      this.Logout();
      this.$navigateTo(Login);
    },
    onLoaded() {
      this.$refs.userAlbums.load();
    }
  }
};
</script>
