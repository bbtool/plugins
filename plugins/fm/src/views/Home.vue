<template>
  <div class="home">
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
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbenyouhuifile.it168.com%2Fforum%2Fday_100429%2F1004291840008539c8ac02cd5c.jpg&refer=http%3A%2F%2Fbenyouhuifile.it168.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627204999&t=35b0cf303a84e87d64cd020aff1d4e57");
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