<template>
  <div class="side_menu">
    <div
      class="side_menu_item"
      v-for="(item, index) in menus"
      :key="index"
      :class="{ active: index == currentIndex }"
      @click="changeMenu(index)"
    >
      <div class="side_menu_item_icon">
        <svg>
          <use :xlink:href="'#' + item.icon"></use>
        </svg>
      </div>
      <div class="side_menu_item_label" v-text="item.label"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
  props: {
    menus: {
      immediate: true,
      default() {
        return [];
      },
    },
    activeIndex: {
      immediate: true,
      default: 0,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  mounted() {
    this.currentIndex = this.activeIndex;
  },
  methods: {
    changeMenu(index) {
      if (Number(index) == this.currentIndex) return;
      this.currentIndex = Number(index);
      this.$emit("change", this.currentIndex);
    },
  },
};
</script>

<style lang="less" scoped>
.side_menu {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  &_item {
    width: 100%;
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    padding: 0 15px;
    box-sizing: border-box;
    &:hover {
      background-color: #f0f0f0;
    }
    &.active {
      background-color: #e8e8e8 !important;
    }
    &_icon {
      width: 24px;
      height: 32px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      svg {
        width: 20px;
        height: 20px;
        fill: #888;
      }
    }
    &_label {
      font-size: 14px;
      color: #888;
      margin-left: 8px;
    }
  }
}
</style>