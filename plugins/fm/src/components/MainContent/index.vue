<template>
  <div class="main_content">
    <keep-alive>
      <component :is="currentPage"></component>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "MainContent",
  components: {
    TabTelevision: () => import("./TabTelevision.vue"),
    TabRadio: () => import("./TabRadio.vue"),
    TabAnchor: () => import("./TabAnchor.vue"),
  },
  props: {
    currentPage: {
      type: String,
      default: "TabTelevision",
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