<template>
  <Page class="page">
    <ActionBar title="Login" class="action-bar" />
    <StackLayout>
      <Button text="Or Register" @tap="goToRegister"></Button>
    </StackLayout>
  </Page>
</template>

<script>
import Register from "./Register.vue";
export default {
  data() {
    return {};
  },
  methods: {
    goToRegister() {
      this.$navigateTo(Register);
    }
  }
};
</script>

<style></style>
