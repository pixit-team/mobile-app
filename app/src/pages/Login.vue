<template>
  <Page class="page">
    <ActionBar title="Login" class="action-bar" />
    <StackLayout class="form m-20">
      <InputWithError
        v-model="email"
        hint="Email"
        keyboardType="email"
        autocorrect="false"
        autocapitalizationType="none"
        errorMessage="Invalid email format"
        :error="emailError"
      />
      <InputWithError
        v-model="password"
        errorMessage="Password must contain digits, symbols, lowercase and uppercase letters and be at least 8 characters long"
        :error="passwordError"
        hint="Password"
        autocorrect="false"
        autocapitalizationType="none"
        secure
      />
      <Button
        :isEnabled="!loading"
        text="Login"
        class="btn btn-primary btn-rounded-sm"
        @tap="login"
      />
      <Button
        text="Or Register"
        class="btn btn-outline btn-rounded-sm"
        @tap="goToRegister"
      />
      <ActivityIndicator :busy="loading" />
    </StackLayout>
  </Page>
</template>

<script>
import App from "../App";
import Register from "./Register.vue";
import InputWithError from "../components/InputWithError.vue";
import { validateEmail, validatePassword } from "../../utils/validator";

import { mapActions } from "vuex";

export default {
  components: { InputWithError },
  data() {
    return {
      email: "pierrot.said@epitech.eu",
      password: "zefZEF123!",
      emailError: false,
      passwordError: false,
      loading: false
    };
  },
  methods: {
    ...mapActions("user", ["Login"]),
    async login() {
      this.emailError = !validateEmail(this.email);
      this.passwordError = !validatePassword(this.password);
      if (this.emailError || this.passwordError) {
        return;
      }
      this.loading = true;
      try {
        await this.Login({
          email: this.email,
          password: this.password
        });
        this.loading = false;
        this.$navigateTo(App);
      } catch (error) {
        this.loading = false;
        console.log("Error : ", error);
        //TODO Toast
      }
    },
    goToRegister() {
      this.$navigateTo(Register);
    }
  }
};
</script>

<style scoped></style>
