<template>
  <div class="main_content">
    <div class="fm_box">
      <div class="fm_name" v-text="activeFm.name"></div>
      <div
        class="fm_description"
        v-if="activeFm.description"
        v-text="activeFm.description"
      ></div>
    </div>
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
  watch: {
    activeFm: {
      immediate: true,
      deep: true,
      handler(val) {
        console.log(JSON.stringify(val, null, 2));
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .fm_box {
    width: 480px;
    min-height: 150px;
    background-color: rgba(0, 0, 0, 0.2);
    border: rgba(255, 255, 255, 0.3) 1px solid;
    border-radius: 4px;
    margin-bottom: 50px;
    padding: 15px;
    box-sizing: border-box;
    .fm_name {
      width: 100%;
      height: 32px;
      font-size: 20px;
      color: #fff;
      text-shadow: 0 1px 5px rgb(0, 0, 0, 0.5);
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .fm_description {
      width: 100%;
      font-size: 14px;
      color: #fff;
      text-shadow: 0 1px 5px rgb(0, 0, 0, 0.5);
    }
  }
}
</style>