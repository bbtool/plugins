<template>
  <div class="main_content">
    <div class="item"
         v-for="(item, index) in list"
         :key="index"
         :class="{active: index == currentIndex}">
      <div class="item_index">
        <div class="item_index_content"
             v-text="index + 1"></div>
      </div>
      <div class="item_time"
           v-text="$timeFormat(item.time)"></div>
      <div class="item_content"
           v-html="item.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentIndex: 0,
      list: [
        {
          type: 'text',
          content: 'activeIndex',
          time: 1625414974978,
          detail: {}
        },
        {
          type: 'text',
          content: 'PNG转ICO\n - \n在线转换图标文件',
          time: 1625414626676,
          detail: {}
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.main_content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  .item {
    width: 100%;
    min-height: 50px;
    border-radius: 4px;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    flex-direction: row;
    align-items: center;
    &.active {
      border: 1px soild #f333;
    }
    &_index {
      width: 48px;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      &_content {
        width: 32px;
        height: 32px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #888;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    &_time {
      font-size: 12px;
      color: #888;
      width: 64px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    &_content {
      flex: 1;
      height: 100%;
      padding: 8px 15px;
      box-sizing: border-box;
      font-size: 13px;
      color: #666;
    }
  }
}
</style>