<template>
  <Page class="page">
    <ActionBar title="Add Album" class="action-bar">
      <NavigationButton
        text="Go Back"
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack"
      />
    </ActionBar>
    <StackLayout class="form m-20">
      <InputWithError
        v-model="name"
        errorMessage="Invalid name"
        :error="nameError"
      />
      <Button
        :isEnabled="!loading"
        text="Create"
        class="btn btn-primary btn-rounded-sm"
        @tap="create"
      />
      <ActivityIndicator :busy="loading" />
    </StackLayout>
  </Page>
</template>

<script>
import InputWithError from "../components/InputWithError.vue";
import { validateName } from "../../utils/validator";

import { mapActions } from "vuex";

export default {
  components: { InputWithError },
  data() {
    return {
      name: "",
      nameError: false,
      loading: false
    };
  },
  methods: {
    ...mapActions("userAlbums", ["AddAlbum"]),
    async create() {
      this.nameError = !validateName(this.name);
      if (this.nameError) {
        return;
      }
      this.loading = true;
      try {
        await this.AddAlbum({
          name: this.name
        });
        this.loading = false;
        this.$navigateBack();
      } catch (error) {
        this.loading = false;
        console.log("Error : ", error);
        //TODO Toast
      }
    }
  }
};
</script>
