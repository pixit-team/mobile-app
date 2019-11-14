<template>
  <Page class="page">
    <ActionBar title="Second" class="action-bar" />
    <StackLayout>
      <Button @tap="this.$navigateBack" text="Go Back"></Button>
    </StackLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log("Second is created");
    
  },
};
</script>

<style>
</style>
