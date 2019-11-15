<template>
  <Page class="page">
    <ActionBar title="Home" class="action-bar" />
    <StackLayout>
      <Button text="Go to Login" @tap="goToSecond" />
    </StackLayout>
  </Page>
</template>

<script>
import Login from "./pages/Login";

export default {
  data() {
    return {};
  },
  methods: {
    goToSecond() {
      this.$navigateTo(Login);
    }
  }
};
</script>
