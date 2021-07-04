<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  outline: none;
  -webkit-app-region: no-drag;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
.clr {
  .ivu-input {
    border: none !important;
    // background-color: transparent !important;
    color: #333;
    height: 100%;
    &:focus {
      border-color: transparent !important;
      box-shadow: none !important;
    }
    &:hover {
      border-color: transparent !important;
    }
    &::placeholder {
      color: #c8c8c8;
    }
  }
  textarea {
    resize: none;
  }
}
</style>
