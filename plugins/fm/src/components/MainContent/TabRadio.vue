<template>
  <div class="content_wrapper">
    <div class="content_scroller">
      <div>Radio</div>
      <div style="position: absolute; top: 1200px">Radio 1200</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Radio",
  created() {
    console.log("Radio created");
  },
};
</script>

<style lang="less" scoped>
.content_wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .content_scroller {
    position: relative;
    width: 100%;
    height: 2000px;
  }
}
</style>