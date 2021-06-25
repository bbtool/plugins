<template>
  <div class="main_content">
    {{ JSON.stringify(activeFm, null, 2) }}
  </div>
</template>

<script>
export default {
  name: "MainContent",
  components: {},
  props: {
    activeFm: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.main_content {
  width: 100%;
  height: 100%;
}
</style>