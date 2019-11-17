<template>
  <Page class="page">
    <ActionBar title="Camera" class="action-bar">
      <NavigationButton
        text="Go Back"
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack"
      />
    </ActionBar>

    <GridLayout rows="auto, *, auto, auto">
      <span style="color: white">{{ base64Image }}</span>
      <Image
        id="image"
        row="1"
        :src="cameraImage"
        stretch="aspectFit"
        margin="10"
      />
      <Button
        v-if="cameraImage == null"
        class="btn btn-primary btn-rounded-sm"
        row="3"
        text="Take Picture"
        padding="10"
        @tap="onTakePictureTap"
      />
      <Button
        v-else
        :isEnabled="!loading"
        row="3"
        class="btn btn-primary btn-rounded-sm"
        text="Share the picture"
        padding="10"
        @tap="submitPicture"
      />
    </GridLayout>
  </Page>
</template>

<script>
import { ImageSource } from "tns-core-modules/image-source";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "Camera",
  props: ["albumUuid"],
  data() {
    return {
      saveToGallery: false,
      allowsEditing: false,
      keepAspectRatio: true,
      width: 320,
      height: 240,
      cameraImage: null,
      labelText: "",
      base64Image: null,
      loading: false
    };
  },
  methods: {
    ...mapActions("userAlbums", ["SetAddedPhoto"]),
    onTakePictureTap: function() {
      var camera = require("nativescript-camera");
      // eslint-disable-next-line no-unused-vars
      var imageModule = require("tns-core-modules/ui/image");
      camera.requestPermissions().then(
        () => {
          camera
            .takePicture({
              width: this.width,
              height: this.height,
              keepAspectRatio: this.keepAspectRatio,
              saveToGallery: this.saveToGallery,
              allowsEditing: this.allowsEditing
            })
            .then(imageAsset => {
              this.cameraImage = imageAsset;
              ImageSource.fromAsset(imageAsset).then(res => {
                let myImageSource = res;
                var base64 = myImageSource.toBase64String("jpeg", 30);
                this.base64Image = "data:Image/png;base64," + base64;
              });
            })
            .catch(function(err) {
              console.log("error : ", err.message);
            });
        },
        function failure() {}
      );
    },
    async submitPicture() {
      this.loading = true;
      try {
        const res = await axios.post(`/albums/${this.albumUuid}/photo-add`, {
          img: this.base64Image
        });
        if (res.status === 200) {
          this.cameraImage = null;
          this.base64Image = null;
          const image = res.data.photo;
          this.SetAddedPhoto(image);
          this.loading = false;
          this.$navigateBack();
        }
      } catch (e) {
        console.log("error : ", e.message);
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped></style>
