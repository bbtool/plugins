<template>
  <div id="app">
    <Home></Home>
    <Svgs></Svgs>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  outline: none;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
.ivu-tooltip-rel {
  height: 100%;
}
</style>
<script>
export default {
  name: 'App',
  components: {
    Home: () => import('./views/Home'),
    Svgs: () => import('./Svgs')
  }
}
</script>