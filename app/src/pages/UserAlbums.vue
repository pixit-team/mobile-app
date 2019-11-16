<template>
  <Page class="page">
    <ActionBar title="My Albums" class="action-bar">
      <NavigationButton
        text="Go Back"
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack"
      />
      <ActionItem
        android.systemIcon="ic_menu_add"
        android.position="actionBar"
        @tap="addTapped"
      ></ActionItem>
    </ActionBar>
    <StackLayout>
      <!-- <Button text="reload" @tap="reload" /> -->
      <FlexBoxLayout
        v-if="loading"
        style="justify-content:center; align-items:center"
      >
        <ActivityIndicator :busy="true" />
      </FlexBoxLayout>
      <ListView for="album in albums" rowHeight="80" @itemTap="onItemTap">
        <v-template>
          <StackLayout class="album-item hr-dark m-10 p-10">
            <Label
              class="font-weight-bold;"
              style="color:white"
              :text="album.name"
            />
            <Label class="footnote" :text="`${album.nb_members} Members`" />
            <Label class="footnote" :text="`${album.nb_items} Pictures`" />
          </StackLayout>
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddAlbum from "./AddAlbum.vue";

export default {
  computed: {
    ...mapState("userAlbums", ["albums", "loading"])
  },
  async created() {
    await this.GetAlbums();
  },
  methods: {
    ...mapActions("userAlbums", ["GetAlbums"]),
    async reload() {
      this.loading = true;
      await this.GetAlbums();
      this.loading = false;
    },
    addTapped() {
      this.$navigateTo(AddAlbum);
    },
    onItemTap() {}
  }
};
</script>
