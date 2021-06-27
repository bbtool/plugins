<template>
  <div class="home"
       :style="{ backgroundImage: `url('${bg}')` }">
    <div class="video_box"
         id="video_box">
      <video class="video-js vjs-big-play-centered"
             controls
             preload="auto"
             id="my-player"
             data-setup='{}'
             style="width: 100%; height: 100%;">
        <source id="source"
                :src="$getUrlFromLocal(activeSource.url)"
                :type="activeSource.type">
        </source>
      </video>
    </div>

    <Drawer title="分享广播"
            :closable="false"
            :width="360"
            placement="left"
            v-model="drawerModal.shown">

    </Drawer>
  </div>
</template>

<script>
import { Drawer } from "view-design";
import videojs from 'video.js'
import 'videojs-flash'
// import '@videojs/http-streaming'
require('video.js/dist/video-js.min.css')
export default {
  name: "Home",
  components: {
    Drawer,
  },
  data () {
    return {
      bg: "http://attach.bbs.miui.com/forum/201107/18/1128552dfogdk5efkhzmoh.jpg",
      mimetypes: [
        {

        }
      ],
      musicBgs: ['http://v.bootstrapmb.com/2019/4/u0d54217', 'http://v.bootstrapmb.com/2018/12/0twha3250', 'http://v.bootstrapmb.com/2019/10/5s65c6354', 'http://v.bootstrapmb.com/2019/5/lm53h4838', 'http://v.bootstrapmb.com/2019/10/x6xcs6480', 'http://v.bootstrapmb.com/2019/4/lm8y53989', 'http://v.bootstrapmb.com/2019/3/wxmoy3693'],
      activeSource: {
        url: '/Users/liangshan/Downloads/yfzm.flac', // 'https://static.dei2.com/resources/yfzm.flac',
        type: 'audio/flac'
        // url: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
        // type: 'application/x-mpegURL'
      },
      drawerModal: {
        shown: false
      }
    };
  },
  mounted () {
    bbtools.setHeaderBg('#000')

    bbtools.on('filter-changed', this.filterChanged)

    this.initPlayer()
  },
  methods: {
    filterChanged (event, data) {
      console.log('####', data)
      this.activeSource = {
        url: data.filter,
        type: 'audio/flac'
      }
      this.initPlayer()
    },
    addItem (opts) {
      const that = this
      let playlistEle = document.createElement('div')
      !playlistEle.classList.contains('video_control_item') && playlistEle.classList.add('video_control_item')
      playlistEle.setAttribute('title', opts.title)
      playlistEle.onclick = () => {
        opts.onclick && opts.onclick()
      }
      let playlistImgEle = document.createElement('img')
      // playlistImgEle.setAttribute('src', this.$getUrlFromLocal(opts.icon))
      playlistImgEle.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABuklEQVR4Xu1aoU4FMRCcsWgClp94YEHyLUgUCr4Ai+MH+AUSSLAYwgdgSTDgcEsuORLE5WWbtnsbOqe3nensdK/dO2Lwh4OvHxJADhhcAW2BwQ2gIqgtULIFzOwAwIbkXcm4zLFFDjCzNwCTCPcALkg+Z16ch5tbADM7BvDwZ9KvWYQbD1DWmBoBftd0C+CM5HfWRW7j1UKAaf7XWYSnbWBmdgngEMBOJ7E+AbyQvPLO30qAX7xzktdL4Ga2C+DDS6wybo+kC6u1ABPvRfCFGlK5xq3DT0g+egAkgEelKcaZwWG3gLcITsVp89+K4LCvweEOQvsA3ueaMd5ReC6EpwCOSg4a3iK7Vpz7NbgWwd64EqC3wtnnlwOyZ6g3PzmgROGA+3wJnaXYrv2AyPt8rRCr9gNqybcYv2o/oMUCaufoIsDYW2C+C/S+z9dmvl8RrGWWdbzOAVkzE8VLDohSOiuOHJA1M1G85IAopbPiyAElmVE/IO77fklelmLVD1jz/4Da7LUYr35A819k1A9oYcyEc+gckDApoZTkgFC5E4LJAQmTEkpJDgiVOyGYHJAwKaGU5IBQuROC/QCYYaxB0em3QwAAAABJRU5ErkJggg==')
      playlistImgEle.style.width = '18px'
      playlistImgEle.style.height = '18px'
      playlistEle.appendChild(playlistImgEle)
      let volumeEle = document.querySelector('.vjs-volume-panel')
      volumeEle.parentNode.insertBefore(playlistEle, volumeEle)
    },
    addMusicBox (src) {
      // vjs-tech
      const that = this
      let playlistEle = document.createElement('div')
      !playlistEle.classList.contains('music_container') && playlistEle.classList.add('music_container')
      let musicBox = document.createElement('iframe')
      musicBox.src = src || 'http://v.bootstrapmb.com/2019/4/u0d54217/'
      playlistEle.appendChild(musicBox)
      let volumeEle = document.querySelector('.vjs-tech')
      volumeEle.parentNode.insertBefore(playlistEle, volumeEle)
    },
    initPlayer () {
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
             controls
             preload="auto"
             id="my-player"
             data-setup='{"autoplay": "true"}'
             style="width: 100%; height: 100%;">
        <source id="source"
                src="${this.$getUrlFromLocal(this.activeSource.url)}"
                type="${this.activeSource.type}">
        </source>
      </video>`
      videoBox.innerHTML = videoStr

      const that = this

      this.player = videojs('my-player', this.playerOptions, function onPlayerReady () {
        document.querySelector('.vjs-picture-in-picture-control').style.display = 'none'
        document.querySelector('.video-js .vjs-tech').style.zIndex = 2
        document.querySelector('.video-js .vjs-control-bar').style.zIndex = 3

        // videojs.log('Your player is ready!')
        let ran = Math.floor(Math.random() * that.musicBgs.length)
        console.log('>>>>>>>', ran)
        that.addMusicBox(that.musicBgs[ran] || 'http://v.bootstrapmb.com/2019/3/wxmoy3693')

        that.addItem({
          title: '播放列表',
          icon: '',
          onclick () {
            that.drawerModal.shown = true
          }
        })
        this.play()

        this.on('play', function () {
        })

        this.on('pause', function () {
        })

        // How about an event listener?
        this.on('ended', function () {
        })
        this.on('error', function () {
        })
        this.on("canplaythrough", function () {
        })
        this.on("waiting", function () {
        });
        this.on("loadstart", function () {
        })
      })
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  background-repeat: no-repeat;
  background-size: cover;
  .video_box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>