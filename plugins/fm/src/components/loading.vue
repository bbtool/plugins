<template>
  <div class="loading" :style="{ width: width + 'px', height: height + 'px' }">
    <span :style="{ backgroundColor: color }"></span>
    <span :style="{ backgroundColor: color }"></span>
    <span :style="{ backgroundColor: color }"></span>
    <!-- <span :style="{ backgroundColor: color }"></span> -->
    <!-- <span :style="{ backgroundColor: color }"></span> -->
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    color: {
      type: String,
      default: "#fff",
    },
    width: {
      type: Number,
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
    },
  },
};
</script>

<style lang="less" scoped>
.loading {
  display: flex;
  flex-direction: row;
  //   width: 24px;
  //   height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.loading span {
  display: inline-block;
  width: 3px;
  height: 60%;
  border-radius: 4px;
  -webkit-animation: load 1s ease infinite;
}
@-webkit-keyframes load {
  0%,
  100% {
    height: 30%;
    // height: 10px;
    // background: lightgreen;
  }
  50% {
    height: 70%;
    // height: 18px;
    // margin: -15px 0;
    // background: lightblue;
  }
}
.loading span:nth-child(2) {
  -webkit-animation-delay: 0.2s;
}
.loading span:nth-child(3) {
  -webkit-animation-delay: 0.4s;
}
.loading span:nth-child(4) {
  -webkit-animation-delay: 0.6s;
}
.loading span:nth-child(5) {
  -webkit-animation-delay: 0.8s;
}
</style>