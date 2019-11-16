<template>
  <Page class="page">
    <ActionBar title="Login" class="action-bar" />
    <StackLayout>
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
      <Button text="Or Register" @tap="goToRegister"></Button>
    </StackLayout>
  </Page>
</template>

<script>
import Register from "./Register.vue";
import InputWithError from "../components/InputWithError.vue";
import { validateEmail, validatePassword } from "../../utils/validator";

import { mapActions } from "vuex";

export default {
  components: { InputWithError },
  data() {
    return {};
  },
  ...mapActions("user", ["Login"]),
  methods: {
    async login() {
      this.emailError = !validateEmail(this.email);
      this.passwordError = !validatePassword(this.password);
      if (this.emailError || this.nameError || this.passwordError) {
        return;
      }
      this.loading = true;
      await this.Login({
        email: this.email,
        password: this.password
      });
      this.loading = false;
    },
    goToRegister() {
      this.$navigateTo(Register);
    }
  }
};
</script>

<style scoped>
.input::placeholder {
  color: white;
  background-color: black;
}

.input {
  background-color: black;
  color: white;
}
</style>
