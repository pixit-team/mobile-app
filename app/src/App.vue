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
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["loggedIn"])
  },
  mounted() {
    if (this.loggedIn) {
      console.log("REDIRECTION !");
      this.$navigateTo(Login);
    }
    // console.log("Is the Pelo Logged in ?: ", this.loggedIn);
  },
  methods: {
    goToSecond() {
      console.log("kiloutou");
    }
  }
};
</script>
