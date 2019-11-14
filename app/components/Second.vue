<template>
  <Page class="page">
    <ActionBar title="Second" class="action-bar" />
    <StackLayout>
      <Button text="Go back" @tap="this.$navigateBack"></Button>
      <Label text="Mail : " />
      <Label :text="user.mail" />
    </StackLayout>
  </Page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["user"])
  },
  created() {
    console.log("Second is created");
  }
};
</script>

<style></style>
