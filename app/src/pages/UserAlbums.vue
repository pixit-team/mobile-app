<template>
  <Page class="page" @navigatingTo="onNavigatingTo">
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
import AlbumView from "./AlbumView.vue";

export default {
  props: ["toAlbum"],
  computed: {
    ...mapState("userAlbums", ["albums", "loading"])
  },
  async created() {
    await this.GetAlbums();
  },
  methods: {
    ...mapActions("userAlbums", ["GetAlbums"]),
    addTapped() {
      this.$navigateTo(AddAlbum);
    },
    onItemTap(event) {
      this.$navigateTo(AlbumView, {
        props: {
          albumInfo: event.item
        }
      });
    }
  }
};
</script>
