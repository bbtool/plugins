<template>
  <div class="home">
    <div class="home_top"
         @drop="drop">
      <Input placeholder="输入文字、粘贴截图、拖放二维码文件"
             class="clr"
             type="textarea"
             style="height: 100%;"
             v-model="filter"
             @on-keydown="onKeydown">测试</Input>
    </div>
    <div class="home_bottom">
      <Tooltip content="点击复制、下载二维码图片"
               placement="right"
               :disabled="!filter"
               always>
        <div class="qrcode_container"
             @click="downloadFile">
          <div class="qrcode_container_empty"
               v-if="!filter">此处生成二维码</div>
          <canvas id="qrcodeWrapperRef"
                  class="pen"></canvas>
        </div>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import { Input, Tooltip } from "view-design";
import qrcodeParser from "qrcode-parser"
import QRCode from 'qrcode'
import Jimp from 'jimp'
import qrcodeReader from 'qrcode-reader'
export default {
  name: 'Home',
  components: {
    Input, Tooltip
  },
  data () {
    return {
      isMac: (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel'),
      filter: ''
    }
  },
  watch: {
    filter: {
      immediate: true,
      handler (val) {
        this.genQrcode(val)
      }
    }
  },
  methods: {
    onKeydown (e) {
      if (this.isMac) {
        if (e.metaKey && (e.keyCode == 86)) {
          this.keyCodeHandler(e)
        }
      } else {
        if (e.ctrlKey && (e.keyCode == 86)) {
          this.keyCodeHandler(e)
        }
      }
    },
    async keyCodeHandler (e) {
      let _img = bbtools.clipboard.readImage()
      if (!_img.isEmpty()) {
        e.preventDefault()
        let _res = await qrcodeParser(_img.toDataURL())
        this.filter = _res.data
      } else {
        let _text = bbtools.clipboard.readText()
        if (_text && _text.trim()) {
        }
      }
    },
    genQrcode (val) {
      if (val) {
        QRCode.toCanvas(document.getElementById('qrcodeWrapperRef'), val, {
          errorCorrectionLevel: 'H',
          width: 300,
          height: 300,
        }, function (err) {
          if (err) {
            throw err
          }
        })
      } else {
        let canvas = document.getElementById('qrcodeWrapperRef')
        if (!canvas) return
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    },
    async drop (e) {
      e.preventDefault()
      e.stopPropagation()
      let _files = Array.from(e.dataTransfer.files).filter(item => !!item.type.match(/^image/))
      let _file = _files[0]
      if (_file) {
        Jimp.read(this.$getUrlFromLocal(_file.path)).then(async (image) => {
          let decodeQR = new qrcodeReader()
          decodeQR.callback = (errorWhenDecodeQR, result) => {
            if (errorWhenDecodeQR) {
              return;
            }
            if (!result) {
              return;
            } else {
              this.filter = result.result
            }
          }
          decodeQR.decode(image.bitmap)
        })
      }
    },
    downloadFile () {
      if (this.filter) {
        let content = document.getElementById('qrcodeWrapperRef').toDataURL('image/png')

        let _img = bbtools.nativeImage.createFromDataURL(content)
        bbtools.clipboard.writeImage(_img)

        let aLink = document.createElement('a')

        aLink.download = 'qrcode.png'
        aLink.href = content

        aLink.click()

        this.$Message.success({
          content: '图片复制成功',
          duration: 5
        })
      } else {

      }
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  overflow-y: auto;
  background-color: #f5f5f5;
  &_top {
    width: 100%;
    height: 30%;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px;
    box-sizing: border-box;
  }
  &_bottom {
    width: 100%;
    height: 70%;
    min-height: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .qrcode_container {
      position: relative;
      width: 300px;
      height: 300px;
      background-color: #fff;
      border-radius: 6px;
      overflow: hidden;
      &_empty {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        color: #c8c8c8;
        user-select: none;
        pointer-events: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      canvas {
      }
    }
  }
}
</style>
