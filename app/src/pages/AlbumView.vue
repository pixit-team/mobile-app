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
      <Label v-if="album" :text="album.name" />
    </StackLayout>
  </Page>
</template>

<script>
import axios from "axios";

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
