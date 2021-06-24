<template>
  <div class="side_menu">
    <div class="list_group"
         v-for="(item, index) in list"
         :key="index">
      <div class="list_group_title"
           v-text="item.label"></div>
      <div class="list_group_content">
        <div class="list_group_content_item"
             v-for="(itm, idx) in item.children"
             :key="idx"
             :class="{ active: index == currentIndex[0] && idx == currentIndex[1] }"
             v-text="itm.label"
             @click="changeMenu(index, idx)"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
  props: {
    list: {
      type: Array,
      default () {
        return [];
      },
    },
    activeIndex: {
      type: Array,
      default () {
        return [0, 0]
      },
    },
  },
  data () {
    return {
      currentIndex: [0, 0],
    };
  },
  mounted () {
    this.currentIndex = this.activeIndex;
  },
  methods: {
    changeMenu (mainIndex, subIndex) {
      if (mainIndex == this.currentIndex[0] && subIndex == this.currentIndex[1]) return

      this.currentIndex = [mainIndex, subIndex];
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
  overflow-y: auto;
  .list_group {
    width: 100%;
    &_title {
      position: sticky;
      left: 0;
      top: 0;
      width: 100%;
      height: 32px;
      padding: 0 15px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      color: #555;
      background-color: #f8f8f8;
    }
    &_content {
      width: 100%;
      &_item {
        width: 100%;
        height: 32px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 30px;
        box-sizing: border-box;
        font-size: 12px;
        color: #181818;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &.active {
          background-color: #ccc !important;
        }
        &:hover {
          background-color: #f0f0f0;
        }
      }
    }
  }
}
</style>