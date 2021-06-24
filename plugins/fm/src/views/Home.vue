<template>
  <div class="home">
    <div class="home_left">
      <side-menu
        :menus="menus"
        :active-index="activeIndex"
        @change="changeMenu"
      ></side-menu>
    </div>
    <div class="home_main">
      <MainContent :current-page="menus[activeIndex].name"></MainContent>
    </div>
  </div>
</template>

<script>
import SideMenu from "../components/SideMenu/index.vue";
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    // HelloWorld
    SideMenu: () => import("../components/SideMenu/index.vue"),
    MainContent: () => import("../components/MainContent/index.vue"),
  },
  data() {
    return {
      menus: [
        {
          label: "电视直播",
          icon: "icon-television",
          name: "TabTelevision",
        },
        {
          label: "电台直播",
          icon: "icon-radio",
          name: "TabRadio",
        },
        {
          label: "好友广播",
          icon: "icon-anchor",
          name: "TabAnchor",
        },
      ],
      activeIndex: 1,
    };
  },
  methods: {
    changeMenu(index) {
      if (Number(index) == this.activeIndex) return;
      this.activeIndex = Number(index);
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  &_left {
    width: 150px;
    height: 100%;
  }
  &_main {
    flex: 1;
    height: 100%;
  }
}
</style>