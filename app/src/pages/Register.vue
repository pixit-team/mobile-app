<template>
  <Page class="page">
    <ActionBar title="Register" class="action-bar" />
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
        v-model="name"
        hint="Name"
        errorMessage="Please enter a valid name"
        :error="nameError"
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
        text="Register"
        class="btn btn-primary btn-rounded-sm"
        @tap="onConfirm"
      />
      <Button
        :isEnabled="!loading"
        text="Or login"
        class="btn btn-outline btn-rounded-sm"
        @tap="$navigateBack"
      />
      <ActivityIndicator :busy="loading" />
    </StackLayout>
  </Page>
</template>

<script>
import InputWithError from "../components/InputWithError.vue";
import App from "../App";

import {
  validateEmail,
  validateName,
  validatePassword
} from "../../utils/validator";

import { mapActions } from "vuex";
export default {
  components: { InputWithError },

  data() {
    return {
      email: "",
      name: "",
      password: "",
      emailError: false,
      nameError: false,
      passwordError: false,
      loading: false
    };
  },
  methods: {
    ...mapActions("user", ["Register"]),
    async onConfirm() {
      this.emailError = !validateEmail(this.email);
      this.nameError = !validateName(this.name);
      this.passwordError = !validatePassword(this.password);
      if (this.emailError || this.nameError || this.passwordError) {
        return;
      }
      this.loading = true;
      try {
        await this.Register({
          email: this.email,
          name: this.name,
          password: this.password
        });
        this.loading = false;
        this.$navigateTo(App);
      } catch (error) {
        this.loading = false;
        console.log("Error : ", error);
        // TODO Error Toast
      }
    }
  }
};
</script>

<style scoped></style>
