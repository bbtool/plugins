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
      <div class="item_content">
        <pre style="user-select: text;"
             v-html="item.content"></pre>
      </div>
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
      currentIndex: -1,
      list: [
        {
          type: 'text',
          content: 'activeIndex',
          time: 1625414974978,
          detail: {}
        },
        {
          type: 'text',
          content: '[\n  {\n    \"age\": 4,\n    \"name\": \"zs\"\n  },\n  {\n    \"age\": 4,\n    \"name\": \"ls\"\n  }\n]',
          time: 1625414626676,
          detail: {}
        },
      ],
      db: null
    }
  },
  mounted () {

  },
  methods: {

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
    align-items: flex-start;
    &.active {
      border: 1px solid #f333;
    }
    &:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }
    &_index {
      width: 48px;
      height: 100%;
      margin-top: 10px;
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
      margin-top: 16px;
      width: 64px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    &_content {
      flex: 1;
      height: 100%;
      // padding: 8px 15px;
      box-sizing: border-box;
      font-size: 14px;
      color: #666;
      padding: 15px;
    }
  }
}
</style>