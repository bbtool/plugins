export default {
  data () {
    return {
    }
  },
  created () {

  },
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
    $getFileURL (file) {
      let getUrl = null;
      if (window.createObjectURL !== undefined) { // basic
        getUrl = window.createObjectURL(file);
      } else if (window.URL !== undefined) { // mozilla(firefox)
        getUrl = window.URL.createObjectURL(file);
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        getUrl = window.webkitURL.createObjectURL(file);
      }
      return getUrl;
    }
  }
}