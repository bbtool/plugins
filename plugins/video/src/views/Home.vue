<template>
  <div class="home">
    <div class="home_left">
      <side-menu :list="list"
                 :active-index="activeIndex"
                 @change="changeMenu"></side-menu>
    </div>
    <div class="home_main">
      <MainContent :list="list"
                   :active-index="activeIndex"></MainContent>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    // HelloWorld
    SideMenu: () => import("../components/SideMenu/index.vue"),
    MainContent: () => import("../components/MainContent/index.vue"),
  },
  data () {
    return {
      list: [],
      activeIndex: [0, 1],
    };
  },
  mounted () {
    this.list = bbtools.sendSync('video-live-play-list')
  },
  methods: {
    changeMenu (index) {
      this.activeIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  &_left {
    width: 170px;
    height: 100%;
    overflow-y: auto;
  }
  &_main {
    width: calc(100% - 170px);
    height: 100%;
  }
}
</style>