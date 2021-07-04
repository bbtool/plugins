<template>
  <div class="home">
    <div class="home_left">
      <SideMenu :active-index="activeIndex"
                @change="changeMenuIndex"></SideMenu>
    </div>
    <div class="home_right">
      <MainContent :active-index="activeIndex"></MainContent>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    SideMenu: () => import('../components/SideMenu'),
    MainContent: () => import('../components/MainContent'),
  },
  data () {
    return {
      activeIndex: 0,
    }
  },
  methods: {
    changeMenuIndex (index) {
      this.activeIndex = Number(index)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &_left {
    width: 120px;
    height: 100%;
    border-right: 1px solid #f0f0f0;
    background-color: #fff;
  }
  &_right {
    flex: 1;
    height: 100%;
    background-color: #fff;
  }
}
</style>
