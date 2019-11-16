<template>
  <!-- <FlexBoxLayout :class="loading ? 'mid-loader' : ''">
    <FlexBoxLayout>
    </FlexBoxLayout>
    <StackLayout v-show="!loading"> -->
  <FlexBoxLayout :class="loading ? 'container' : ''">
    <ActivityIndicator v-if="loading" :busy="loading" />
    <ListView v-else for="album in albums" rowHeight="80" @itemTap="onItemTap">
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
  </FlexBoxLayout>
  <!-- </StackLayout>
  </FlexBoxLayout> -->
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      kaka: [{ name: "wsh" }]
    };
  },
  computed: {
    ...mapState("userAlbums", ["albums", "loading"])
  },
  methods: {
    ...mapActions("userAlbums", ["GetAlbums"]),
    async load() {
      await this.GetAlbums();
    },
    onItemTap() {
      console.log("Taptap");
    }
  }
};
</script>

<style>
.container {
  justify-content: center;
  align-content: center;
  align-items: center;
}
.album-item {
  height: 20%;
}
</style>
