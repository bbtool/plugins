export default {
  methods: {
    $getUrlFromLocal (local) {
      if (local.match(/^https?:/)) {
        return local
      }
      const buf = bbtools.fs.readFileSync(local)
      const uint8Buffer = Uint8Array.from(buf)
      const blob = new Blob([uint8Buffer])
      return window.URL.createObjectURL(blob)
    },
    __S4 () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    },
    $getUUID (prefix, format = "**-*-*-*-***") {
      return (prefix || '') + format.replace(/(\*)/g, () => this.__S4())
    },
    $timeFormat (ts) {
      /**
       * < 1分钟: 刚刚
       * < 1小时: x分钟前
       * < 1天: x小时前
       * < 1月: x天前
       * < 1年: x月前
       *   其他: x年前
       */
      let _ts = Number(ts)
      let _now = (+new Date)
      let _delta = _now - _ts
      if (_delta < 60 * 1000) {
        return '刚刚'
      } else if (_delta < 60 * 60 * 1000) {
        return parseInt(_delta / (60 * 1000)) + '分钟前'
      } else if (_delta < 24 * 60 * 60 * 1000) {
        return parseInt(_delta / (60 * 60 * 1000)) + '小时前'
      } else if (_delta < 30 * 24 * 60 * 60 * 1000) {
        return parseInt(_delta / (24 * 60 * 60 * 1000)) + '天前'
      } else if (_delta < 12 * 30 * 24 * 60 * 60 * 1000) {
        return parseInt(_delta / (30 * 24 * 60 * 60 * 1000)) + '月前'
      } else {
        return parseInt(_delta / (12 * 30 * 24 * 60 * 60 * 1000)) + '年前'
      }
    },
  }
}