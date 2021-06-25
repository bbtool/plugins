<template>
  <div class="home" :style="{ backgroundImage: `url('${bg}')` }">
    <div class="home_left">
      <side-menu
        :cities="cities"
        :fms="fms"
        @change="changeFm"
        @change-city="changeCity"
      ></side-menu>
    </div>
    <div class="home_main">
      <MainContent :active-fm="activeFm"></MainContent>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    SideMenu: () => import("../components/SideMenu/index.vue"),
    MainContent: () => import("../components/MainContent/index.vue"),
  },
  data() {
    return {
      // bg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201306%2F16%2F075301tf2288hbhxfbc42l.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627210482&t=94919bb4fea0a8587a04fdd4b26b7796",
      // bg: "https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/c8ea15ce36d3d53919999d683e87e950342ab0f1.jpg",
      bg: "http://image.xinli001.com/20150708/15593404fce2b128fa18f8.png",
      cities: [
        {
          name: "国家",
          id: "3225",
        },
      ],
      currentCity: "3225",
      fms: [],
      activeFm: {},
    };
  },
  watch: {
    currentCity: {
      handler(val) {
        this.initFms();
      },
    },
  },
  mounted() {
    this.initFms();
  },
  methods: {
    initFms() {
      let res = bbtools.sendSync("fm-live-play-list", {
        place: this.currentCity,
      });
      if (res.result_code == 0 && res.data) {
        this.cities = res.data.place || [
          {
            name: "国家",
            id: "3225",
          },
        ];
        this.fms = res.data.top || [];
      } else {
        this.cities = [
          {
            name: "国家",
            id: "3225",
          },
        ];
        this.fms = res.data.top || [];
      }
      console.log(">>>", this.fms);
    },
    changeFm(data) {
      this.activeFm = data;
      console.log("play fm: ", data);
    },
    changeCity(city) {
      this.currentCity = city || "3225";
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
  // background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fatt2.citysbs.com%2Ftiaozao%2F2012%2F04%2F27%2F13%2F131226_kimdkooc_53eac39736c27a2ced374a1d88e96a02.jpg&refer=http%3A%2F%2Fatt2.citysbs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627208927&t=d579db8525b1f5f97603ae2882ba9d4d");
  background-repeat: no-repeat;
  background-size: cover;
  &_left {
    width: 200px;
    height: 100%;
    overflow-y: auto;
  }
  &_main {
    width: calc(100% - 200px);
    height: 100%;
  }
}
</style>