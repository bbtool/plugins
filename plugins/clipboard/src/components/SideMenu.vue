<template>
  <div class="side_menu">
    <div class="side_menu_item"
         v-for="(item, index) in menus"
         :key="index"
         :class="{active: index == currentIndex}"
         @click="changeMenuIndex(index)">
      <svg>
        <use :xlink:href="'#' + item.icon"></use>
      </svg>
      <div class="side_menu_item_text"
           v-text="item.label"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      menus: [
        {
          icon: 'icon-all',
          label: '全部'
        },
        {
          icon: 'icon-text',
          label: '文本'
        },
        {
          icon: 'icon-file',
          label: '文件'
        },
        {
          icon: 'icon-image',
          label: '图片'
        }
      ],
      currentIndex: 0
    }
  },
  created () {
    this.currentIndex = this.activeIndex
  },
  methods: {
    changeMenuIndex (index) {
      if (index == this.currentIndex) return
      this.currentIndex = index
      this.$emit('change', this.currentIndex)
    }
  }
}
</script>

<style lang="less" scoped>
.side_menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  box-sizing: border-box;
  &_item {
    width: 100%;
    height: 42px;
    padding-left: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    svg {
      width: 16px;
      height: 16px;
      fill: #555;
    }
    &_text {
      font-size: 14px;
      color: #555;
      margin-left: 8px;
    }
    &:hover {
      background-color: #f0f0f0;
    }
    &.active {
      background-color: #f0f0f0 !important;
    }
  }
}
</style>