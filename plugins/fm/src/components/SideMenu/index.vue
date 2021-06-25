<template>
  <div class="side_menu">
    <div class="side_menu_header clr">
      <Select
        transfer
        v-model="currentCity"
        filterable
        filter-by-label
        @on-change="changeCity"
      >
        <Option
          v-for="(item, index) in cities"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></Option>
      </Select>
    </div>
    <div class="side_menu_scroller">
      <div
        class="fm_item"
        v-for="(item, index) in fms"
        :key="index"
        :class="{ active: currentFmId == item.id }"
        @click="changeFm(item)"
      >
        <div class="fm_item_logo">
          <img :src="item.icon[0].url" :alt="item.name" />
          <transition name="fade">
            <div class="loading_wrapper" v-if="currentFmId == item.id">
              <Loading></Loading>
            </div>
          </transition>
        </div>
        <div class="fm_item_name" v-text="item.name"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Select, Option } from "view-design";
export default {
  name: "SideMenu",
  components: {
    Select,
    Option,
    Loading: () => import("../loading.vue"),
  },
  props: {
    cities: {
      type: Array,
      default() {
        return [
          {
            name: "国家",
            id: "3225",
          },
        ];
      },
    },
    fms: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentCity: "3225",
      currentFmId: "",
    };
  },
  mounted() {},
  methods: {
    changeFm(data) {
      if (data.id == this.currentFmId) return;
      this.currentFmId = data.id;
      this.$emit("change", data);
    },
    changeCity(city) {
      this.$emit("change-city", city);
    },
  },
};
</script>

<style lang="less" scoped>
.side_menu {
  position: relative;
  width: 100%;
  height: 100%;
  border-right: 1px solid #f5f5f5;
  overflow-y: auto;
  &_header {
    position: sticky;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 36px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &_scroller {
    width: 100%;
    display: flex;
    flex-direction: column;
    .fm_item {
      width: 100%;
      // height: 32px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        background-color: #f8f8f8;
      }
      &.active {
        background-color: #c8c8c8 !important;
        position: sticky;
        z-index: 9;
        top: 36px;
        left: 0;
        bottom: 0;
      }
      &_logo {
        position: relative;
        width: 32px;
        height: 32px;
        border: 1px solid #f0f0f0;
        overflow: hidden;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        img {
          max-width: 32px;
          max-height: 32px;
        }
        .loading_wrapper {
          position: absolute;
          left: -1px;
          top: 0;
          width: 32px;
          height: 32px;
          background-color: lightgreen; // rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
      }
      &_name {
        width: calc(100% - 32px);
        font-size: 13px;
        color: #333;
        padding-left: 8px;
        box-sizing: border-box;
        line-height: 1.2;
      }
    }
  }
}
</style>