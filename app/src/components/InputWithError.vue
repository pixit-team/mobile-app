<template>
  <StackLayout>
    <TextField
      class="input input-rounded m-t-10"
      color="white"
      :maxLength="80"
      v-bind="$attrs"
      :text="value"
      v-on="$listeners"
      @textChange="$emit('input', $event.value)"
    />
    <Label
      v-if="error"
      class="text-danger"
      :text="errorMessage"
      textWrap="true"
    ></Label>
  </StackLayout>
</template>

<script>
export default {
  props: {
    error: { type: Boolean, default: false },
    errorMessage: { type: String, default: "Invalid format" },
    value: {}
  }
};
</script>

<style>
.input {
  placeholder-color: #ffffff;
}
</style>
