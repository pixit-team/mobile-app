<template>
  <Page class="page">
    <ActionBar :title="albumInfo.name" class="action-bar">
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
              <!-- <Label
                class="font-weight-bold;"
                style="color:white"
                :text="item.url"
              /> -->
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

export default {
  props: ["albumInfo"],
  data() {
    return {
      loading: false,
      album: null
    };
  },
  async created() {
    this.loading = true;
    try {
      const res = await axios.get(`/albums/${this.albumInfo.uuid}`);
      if (res.status === 200) {
        // const res_dbg = await axios.get(`https://picsum.photos/v2/list`);
        // this.album = { items: res_dbg.data };
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
    onItemTap(event) {
      this.$navigateTo(PhotoView, {
        props: {
          photoInfo: { author: event.item.added_by, img: event.item.img }
        }
      });
    },
    addTapped() {
      // this.$navigateTo(Camera, {
      //   props: {
      //     albumUuid: this.this.albumInfo.uuid
      //   }
      // });
    }
  }
};
</script>
