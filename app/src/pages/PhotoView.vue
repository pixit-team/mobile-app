<template>
  <Page class="page">
    <ActionBar title="Photo" class="action-bar">
      <NavigationButton
        text="Go Back"
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack"
      />
    </ActionBar>
    <StackLayout>
      <Label
        class="font-weight-bold m-10"
        style="color:white"
        :text="'Added by ' + photoInfo.author"
      />
      <Image :src="photoInfo.img" stretch="aspectFit" />
    </StackLayout>
  </Page>
</template>

<script>
export default {
  props: ["photoInfo"]
};
</script>
