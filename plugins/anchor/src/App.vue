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
.clr {
  .ivu-select {
    .ivu-select-selection {
      border: none !important;
      background-color: transparent !important;
    }
  }
  .ivu-select-visible .ivu-select-selection {
    box-shadow: none !important;
  }
  .ivu-select-input {
    color: #fff !important;
  }
}
.music_container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: #000;
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}

.video_control_item {
  width: 40px;
  height: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: all 0.2s ease-in-out;
  img {
    width: 18px;
    height: 18px;
  }
  &:hover {
    opacity: 0.7;
  }
}
</style>
