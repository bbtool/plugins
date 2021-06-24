<template>
  <div class="main_content">
    <transition name="fade">
      <div id="videoBox"
           style="width: 100%; height: 100%;"
           v-if="canPlay">
        <video class="video-js vjs-big-play-centered"
               controls
               preload="auto"
               id="my-player"
               data-setup='{}'
               style="width: 100%; height: 100%;">
          <source id="source"
                  :src="activeSource.url"
                  :type="activeSource.type">
          </source>
        </video>
      </div>
    </transition>
  </div>
</template>

<script>
require('video.js/dist/video-js.min.css')
import videojs from 'video.js'
import 'videojs-flash'
import '@videojs/http-streaming'
export default {
  name: "MainContent",
  components: {
  },
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
      canPlay: true,
      player: null,
      activeSource: {}
    };
  },
  computed: {
    // activeSource () {
    //   console.log(this.activeIndex)
    //   return this.list[this.activeIndex[0]].children[this.activeIndex[1]]
    // }
  },
  watch: {
    activeIndex: {
      immediate: true,
      handler (val) {
        this.activeSource = this.list[val[0]].children[val[1]]
        // this.initPlayer()
      }
    }
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initPlayer()
      }, 1000)
    })
  },
  methods: {
    play (groupIndex, childrenIndex) {
      this.videoFile = null
      this.activePlaylist = [Number(groupIndex), Number(childrenIndex)]
      setTimeout(() => {
        this.initPlayer()
      }, 100)
    },
    initPlayer () {
      // https://www.awaimai.com/2053.html
      var options = {
        bigPlayButton: true,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        techOrder: ['flash', 'html5'],
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        preload: 'auto',
        language: 'zh-CN',
        loop: true,
        // muted: true
        // poster: 'http://www.ttkzm.com/uploadfile/201912/15/E213231985.jpg'
      }

      if (!this.canPlay) {
        return
      }

      this.player = videojs('my-player')
      if (this.player) {
        try {
          this.player.pause()
          this.player.dispose()
        } catch (err) { }
      }

      let videoBox = document.querySelector('#videoBox')
      videoBox.innerHTML = ''
      let videoStr = `<video class="video-js vjs-big-play-centered"
             controls
             preload="auto"
             id="my-player"
             data-setup='{"autoplay": "true"}'
             style="width: 100%; height: 100%;">
        <source id="source"
                src="${this.activeSource.url}"
                type="${this.activeSource.type}">
        </source>
      </video>`
      videoBox.innerHTML = videoStr

      this.player = videojs('my-player', options, function onPlayerReady () {
        document.querySelector('.vjs-picture-in-picture-control').style.display = 'none'
        // document.querySelector('.video-js .vjs-tech').style.zIndex = 2
        document.querySelector('.video-js .vjs-control-bar').style.zIndex = 3
        this.canPlay = true
        this.play()

        // How about an event listener?
        this.on('ended', function () {
          videojs.log('Awww...over so soon?!')
        })
        this.on('error', function () {//请求数据时遇到错误
          console.log("请求数据时遇到错误")
          this.player.pause()
        })

      })
    },
  }
};
</script>

<style lang="less" scoped>
.main_content {
  width: 100%;
  height: 100%;
}
</style>