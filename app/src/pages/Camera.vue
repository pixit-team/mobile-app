<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text="Home"></Label>
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
        row="3"
        text="Take Picture"
        padding="10"
        @tap="onTakePictureTap"
      />
      <Button
        v-else
        row="3"
        text="Share the picture"
        padding="10"
        @tap="submitPicture"
      />
    </GridLayout>
  </Page>
</template>

<script>
import { ImageSource } from "tns-core-modules/image-source";
import AlbumView from "./AlbumView";
import axios from "axios";

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
      base64Image: null
    };
  },
  methods: {
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
                var base64 = myImageSource.toBase64String("jpeg", 100);
                this.base64Image = base64;
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
      console.log("Base64 => ", this.base64Image);
      try {
        const res = await axios.post(`/albums/${this.albumUuid}/photo-add`, {
          img: this.base64Image
        });
        if (res.status === 200) {
          this.cameraImage = null;
          this.base64Image = null;
          const image = res.data.photo;
          console.log("Image => ", image);
          this.$navigateTo(AlbumView, { props: { image } });
        }
      } catch (e) {
        console.log("error : ", e.message);
      }
    }
  }
};
</script>

<style scoped></style>
