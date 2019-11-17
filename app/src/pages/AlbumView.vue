<template>
  <Page class="page" @navigatingTo="onNavigatingTo">
    <ActionBar :title="album ? album.name : '...'" class="action-bar">
      <NavigationButton
        text="Go Back"
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack"
      />
      <ActionItem
        v-if="album && inAlbum"
        android.systemIcon="ic_menu_add"
        android.position="actionBar"
        @tap="addTapped"
      ></ActionItem>
    </ActionBar>
    <StackLayout>
      <Button
        v-if="album && !inAlbum"
        :isEnabled="!joining"
        text="Join Album"
        class="btn btn-primary btn-rounded-sm"
        @tap="joinTapped"
      />
      <FlexBoxLayout
        v-if="loading"
        style="justify-content:center; align-items:center"
      >
        <ActivityIndicator :busy="true" />
      </FlexBoxLayout>
      <FlexBoxLayout v-if="album">
        <ListView
          for="item in album.items"
          rowHeight="180"
          @itemTap="onItemTap"
        >
          <v-template>
            <StackLayout
              orientation="horizontal"
              class="album-item hr-dark m-10 p-10"
            >
              <Image
                :src="item.img"
                decodeWidth="400"
                decodeHeight="400"
                stretch="aspectFit"
              />
              <StackLayout class="m-5">
                <Label class="footnote" text="Added by" />
                <Label
                  class="footnote"
                  :text="album.members.find(m => m.id === item.addedBy).name"
                />
              </StackLayout>
            </StackLayout>
          </v-template>
        </ListView>
      </FlexBoxLayout>
    </StackLayout>
  </Page>
</template>

<script>
import axios from "axios";
import PhotoView from "./PhotoView.vue";
import Camera from "./Camera.vue";
import { mapState, mapActions } from "vuex";
import App from "../App.vue";

export default {
  props: ["albumInfo", "addedImage"],
  data() {
    return {
      loading: false,
      album: null,
      joining: false
    };
  },
  computed: {
    ...mapState("userAlbums", ["added_photo"]),
    ...mapState("user", ["user"]),
    inAlbum() {
      return (
        this.album &&
        this.album.members.findIndex(m => m.id === this.user.id) !== -1
      );
    }
  },
  async created() {
    this.loading = true;
    try {
      const res = await axios.get(`/albums/${this.albumInfo.uuid}`);
      console.log(res);

      if (res.status === 200) {
        this.album = res.data.album;
        this.loading = false;
        return res;
      }
    } catch (error) {
      this.loading = false;
      console.log("Error : ", error);
    }
  },
  methods: {
    ...mapActions("userAlbums", ["SetAddedPhoto"]),
    ...mapActions("publicAlbums", ["JoinAlbum"]),
    onNavigatingTo() {
      if (this.added_photo) {
        this.album.items.push(this.added_photo);
        this.SetAddedPhoto(null);
      }
    },
    onItemTap(event) {
      this.$navigateTo(PhotoView, {
        props: {
          photoInfo: {
            author: this.album.members.find(m => m.id === event.item.addedBy)
              .name,
            img: event.item.img
          }
        }
      });
    },
    addTapped() {
      this.$navigateTo(Camera, {
        props: {
          albumUuid: this.albumInfo.uuid
        }
      });
    },
    async joinTapped() {
      this.joining = true;
      await this.JoinAlbum(this.album.uuid);
      this.joining = false;
      this.$navigateTo(App, { clearHistory: true });
    }
  }
};
</script>
