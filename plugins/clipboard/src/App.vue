<template>
  <div id="app">
    <router-view />
    <Svgs></Svgs>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Svgs: () => import('./Svgs')
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  outline: none;
  -webkit-app-region: no-drag;
  user-select: none;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
