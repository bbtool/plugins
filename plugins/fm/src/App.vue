<template>
  <div id="app">
    <router-view />
    <all-svgs></all-svgs>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    AllSvgs: () => import("./Svgs.vue"),
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  user-select: none;
  outline: none;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
