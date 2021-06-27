<template>
  <div class="main_content">
    <div class="fm_box">
      <div class="fm_name"
           v-text="activeFm.name"></div>
      <div class="fm_description"
           v-if="activeFm.description"
           v-text="activeFm.description"></div>
      <div class="fm_player">
        <div class="fm_player_btn btn_prev"
             :class="{disabled: activeIndex == 0}"
             @click="setPrev"></div>
        <div class="fm_player_btns">
          <div class="fm_player_btn btn_play"
               :class="['btn_' + (isPlaying ? 'pause' : 'play')]"
               :style="{opacity: isLoading ? 0.4 : 1}"
               @click="togglePlayOrPause">

          </div>
          <transition name="fade">
            <div class="fm_player_btn_loading"
                 v-if="isLoading">
              <Loading2 :size="52"></Loading2>
            </div>
          </transition>

        </div>

        <div class="fm_player_btn btn_next"
             :class="{disabled: activeIndex == (fms.length - 1)}"
             @click="setNext"></div>
        <!-- <div class="fm_player_slider">
          <Slider v-model="currentTime" ></Slider>
        </div> -->
      </div>
    </div>

    <div id="video_box"
         v-if="activeFm && activeFm.streams && activeFm.streams.length">
      <video class="video-js vjs-big-play-centered"
             controls
             preload="auto"
             id="my-player"
             data-setup='{}'
             style="width: 0; height: 0;">
        <source id="source"
                :src="activeFm.streams[0].url"
                type="application/x-mpegURL">
        </source>
      </video>
    </div>
  </div>
</template>

<script>
import { Slider } from "view-design";

import videojs from 'video.js'
import 'videojs-flash'
// import '@videojs/http-streaming'
require('video.js/dist/video-js.min.css')
export default {
  name: "MainContent",
  components: {
    Slider,
    Loading2: () => import('../loading2')
  },
  props: {
    fms: {
      type: Array,
      default () {
        return [];
      },
    },
    activeFm: {
      type: Object,
      default () {
        return {};
      },
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isPlaying: false,
      currentTime: 0,
      player: null,
      isLoading: false,
      playerOptions: {
        errorDisplay: false,
        techOrder: ['flash', 'html5'],
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        preload: 'auto',
        language: 'zh-CN',
        loop: true,
      }
    };
  },
  watch: {
    activeFm: {
      immediate: true,
      deep: true,
      handler (val) {
        // console.log(JSON.stringify(val, null, 2));
        setTimeout(() => {
          this.initPlayer()
        }, 100)
      },
    },
  },
  mounted () {
    // setTimeout(() => {
    //   this.initPlayer()
    // }, 2000)
  },
  methods: {
    play () {
      if (!this.isPlaying) {
        this.isPlaying = true
      }
    },
    pause () {
      if (this.isPlaying) {
        this.isPlaying = false
      }
    },
    setPrev () {
      this.$emit('prev')
    },
    setNext () {
      this.$emit('next')
    },
    togglePlayOrPause () {
      if (!this.player) return
      if (this.isPlaying) {
        this.pause()
        this.player.pause()
      } else {
        this.play()
        this.player.play()
      }
    },
    initPlayer () {
      // https://www.awaimai.com/2053.html

      // if (!this.canPlay) {
      //   return
      // }

      this.player = videojs('my-player')
      if (this.player) {
        try {
          this.player.pause()
          this.player.dispose()
        } catch (err) { }
      }

      let videoBox = document.querySelector('#video_box')
      videoBox.innerHTML = ''
      let videoStr = `<video class="video-js vjs-big-play-centered"
             preload="auto"
             id="my-player"
             data-setup='{"autoplay": "true"}'
             style="width: 0; height: 0;">
        <source id="source"
                src="${this.activeFm.streams[0].url}"
                type="application/x-mpegURL">
        </source>
      </video>`
      videoBox.innerHTML = videoStr

      const that = this

      this.player = videojs('my-player', this.playerOptions, function onPlayerReady () {
        document.querySelector('.vjs-picture-in-picture-control').style.display = 'none'
        // document.querySelector('.video-js .vjs-tech').style.zIndex = 2
        document.querySelector('.video-js .vjs-control-bar').style.zIndex = 3

        // videojs.log('Your player is ready!')

        this.play()

        this.on('play', function () {
          that.play()
          that.isLoading = false
        })

        this.on('pause', function () {
          that.pause()
        })

        // How about an event listener?
        this.on('ended', function () {
          // videojs.log('Awww...over so soon?!')
          that.pause()
          that.isLoading = false
        })
        this.on('error', function () {
          this.pause()
          that.isLoading = false
        })
        this.on("canplaythrough", function () {
          that.isLoading = false
        })
        this.on("waiting", function () {
          that.isLoading = true
        });
        this.on("loadstart", function () {
          that.isLoading = true
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .fm_box {
    width: 360px;
    // min-height: 150px;
    background-color: rgba(0, 0, 0, 0.2);
    border: rgba(255, 255, 255, 0.3) 1px solid;
    border-radius: 4px;
    margin-bottom: 50px;
    padding: 15px;
    box-sizing: border-box;
    .fm_name {
      width: 100%;
      height: 32px;
      font-size: 20px;
      color: #fff;
      text-shadow: 0 1px 5px rgb(0, 0, 0, 0.5);
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .fm_description {
      width: 100%;
      font-size: 14px;
      color: #fff;
      text-shadow: 0 1px 5px rgb(0, 0, 0, 0.5);
    }
    .fm_player {
      width: 100%;
      height: 48px;
      margin-top: 15px;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: center;
      .fm_player_btns {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
      }
      .btn_play {
        // opacity: 0.4;
      }
      &_btn {
        position: relative;
        display: inline-block;
        background-image: url(../../assets/playbtn.png);
        background-repeat: no-repeat;
        margin-right: 20px;
        margin-top: 16px;
        cursor: pointer;
        &_loading {
          position: absolute;
          // left: 0;
          // top: 0;
          // width: 100%;
          // height: 100%;
          left: -3px;
          bottom: -3px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        &.btn_prev {
          width: 34px;
          height: 34px;
          background-position: -90px -6px;
        }
        &.btn_play {
          width: 45px;
          height: 45px;
          background-position: -45px 0;
        }
        &.btn_pause {
          width: 45px;
          height: 45px;
          background-position: 0 0;
        }
        &.btn_next {
          width: 34px;
          height: 34px;
          background-position: -124px -6px;
        }
        &:hover {
          text-decoration: none;
          opacity: 0.8 !important;
        }
        &.disabled {
          cursor: not-allowed;
          opacity: 0.3 !important;
        }
      }
      &_slider {
        flex: 1;
        height: 48px;
        background-color: red;
      }
    }
  }
  #video_box {
    position: absolute;
    left: 3000px;
    top: 0;
    width: 0;
    height: 0;
    overflow: hidden;
  }
}
</style>