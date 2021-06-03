<template>
  <div class="home">
    <div class="main">
      <div class="main_editor"
           :style="{width: showMainAppend ? '50%' : '100%'}"
           ref="mainEditorRef"></div>
      <transition name="fade">
        <div class="main_editor_placeholder"
             v-if="!jsonStr">URL Params、XML、YAML 粘贴自动转为 JSON</div>
      </transition>
      <transition name="fade">
        <div class="main_append"
             :style="{width: showMainAppend ? '50%' : '0%'}">
          <div class="sub_editor"
               ref="subEditorRef"></div>
        </div>
      </transition>
    </div>
    <div class="footer">
      <div class="footer_prepend">this</div>
      <div class="footer_input">
        <input type="text"
               v-model="field"
               @input="changeField"
               placeholder="属性过滤，例如: .field（获取field属性值）">
      </div>
      <transition name="fade">
        <div class="footer_append"
             v-if="currentAction != 'field'">
          <Tooltip :content="'json格式化 ( ' + (isMac ? 'Command + S' : 'Control + S') + ' )'"
                   placement="top-end">
            <div class="footer_append_item"
                 @click="setFormat">
              <svg>
                <use xlink:href="#icon-format"></use>
              </svg>
            </div>
          </Tooltip>
          <Tooltip content="压缩"
                   placement="top-end">
            <div class="footer_append_item"
                 :class="{'active': currentAction == 'compress'}"
                 @click="setCompress">
              <svg>
                <use xlink:href="#icon-minimize"></use>
              </svg>
            </div>
          </Tooltip>
          <Tooltip content="JSON 转 XML"
                   placement="top-end">
            <div class="footer_append_item"
                 :class="{'active': currentAction == 'xml'}"
                 @click="setXml">
              <svg>
                <use xlink:href="#icon-xml"></use>
              </svg>
            </div>
          </Tooltip>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { editor } from 'monaco-editor'
import json5 from 'json5'
import { Tooltip } from 'view-design'
var Parser = require("fast-xml-parser").j2xParser;
//default options need not to set
var defaultOptions = {
  attributeNamePrefix: "",
  attrNodeName: "@", //default is false
  textNodeName: "#text",
  ignoreAttributes: true,
  cdataTagName: "__cdata", //default is false
  cdataPositionChar: "\\c",
  indentBy: "  ",
  format: true,
  rootElement: '<root>',
  supressEmptyNode: true,
  // tagValueProcessor: a => { console.log('>>>', a); return a }
  // tagValueProcessor: a => he.encode(a, { useNamedReferences: true }),// default is a=>a
  // attrValueProcessor: a => he.encode(a, { isAttributeValue: isAttribute, useNamedReferences: true })// default is a=>a
};
var parser = new Parser(defaultOptions);
export default {
  name: 'Home',
  components: {
    Tooltip
  },
  data () {
    return {
      mainEditor: null,
      subEditor: null,
      field: '',
      jsonStr: '',
      subJsonStr: '',
      currentAction: '', // field: 字段过滤; compress: 压缩; xml: 转xml
      isMac: (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel'),
      parseStatusSuccess: true, // true 正常 false 错误
      // jsonData: null
    }
  },
  computed: {
    showMainAppend () {
      if (this.currentAction != '') {
        return true
      } else {
        return false
      }
    },
    jsonData () {
      let outObj
      try {
        outObj = json5.parse(this.jsonStr)
      } catch (err) {
        outObj = {}
        this.subJsonStr = '// JSON 格式错误'
      }
      return outObj
    }
  },
  mounted () {
    this.$nextTick(() => {
      bbtools.send('unregister-shortcut', {
        shortcut: 'Escape'
      })

      this.initMainEditor()
      this.initSubEditor()

      document.querySelector('.home').addEventListener('keydown', this.keyboardEventHandler)
    })
  },
  methods: {
    keyboardEventHandler (e) {
      if (this.isMac) {
        if (e.metaKey && e.keyCode == 83) {
          // cmd + S
          this.setFormat()
        }
      } else {
        if (e.ctrlKey && e.keyCode == 83) {
          // ctrl + S
          this.setFormat()
        }
      }
    },
    setFormat () {
      // this.currentAction = 'format'
      if (this.jsonStr && this.jsonStr.trim()) {
        try {
          json5.parse(this.jsonStr)
          this.jsonStr = JSON.stringify(json5.parse(this.jsonStr), null, 2)
          this.mainEditor.setValue(this.jsonStr)
        } catch (err) {
        }
      }
    },
    setCompress () {
      if (this.currentAction == 'compress') {
        this.currentAction = ''
      } else {
        if (!this.jsonStr || !this.jsonStr.trim()) return

        editor.setModelLanguage(this.subEditor.getModel(), 'json')
        this.currentAction = 'compress'
        try {
          json5.parse(this.jsonStr)
          this.subJsonStr = JSON.stringify(this.jsonData)
        } catch (err) {
          this.subJsonStr = '// JSON 格式错误'
        }

        this.initSubEditor()
      }
    },
    setXml () {
      if (this.currentAction == 'xml') {
        this.currentAction = ''
      } else {
        if (!this.jsonStr || !this.jsonStr.trim()) return

        this.currentAction = 'xml'
        // this.subJsonStr = parser.parse(this.jsonData)
        try {
          json5.parse(this.jsonStr)
          editor.setModelLanguage(this.subEditor.getModel(), 'xml')
          this.subJsonStr = `<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n${parser.parse(this.jsonData)}</root>`
        } catch (err) {
          editor.setModelLanguage(this.subEditor.getModel(), 'json')
          this.subJsonStr = '// JSON 格式错误'
        }
        this.initSubEditor()
      }
    },
    initMainEditor () {
      this.mainEditor = editor.create(this.$refs.mainEditorRef, {
        language: 'json',
        value: '',
        automaticLayout: true,
        minimap: {
          enabled: false
        },
        suggest: {
          enabled: false
        },
        scrollbar: {
          vertical: 'auto',
          verticalSliderSize: 5,
          verticalScrollbarSize: 5
        },
        overviewRulerBorder: false,
        tabSize: 2,
        autoIndent: true,
        contextmenu: false,
        formatOnPaste: true,
        formatOnType: true
      })

      this.mainEditor.onDidChangeModelContent(() => {
        this.jsonStr = this.mainEditor.getValue()
        if (!this.jsonStr) {
          this.currentAction = ''
          this.subJsonStr = ''
          this.initSubEditor()
        } else if (this.currentAction == 'compress') {
          editor.setModelLanguage(this.subEditor.getModel(), 'json')
          this.subJsonStr = JSON.stringify(this.jsonData)
          this.initSubEditor()
        } else if (this.currentAction == 'xml') {
          editor.setModelLanguage(this.subEditor.getModel(), 'xml')
          // this.subJsonStr = parser.parse(this.jsonData)
          this.subJsonStr = `<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n${parser.parse(this.jsonData)}</root>`
          this.initSubEditor()
        }
      })

      this.mainEditor.onDidPaste((e) => {
        if (this.jsonStr.match(/^https?:/)) {
          if (this.jsonStr.indexOf('?')) {
            this.jsonStr = JSON.stringify(this.urlFormat(this.jsonStr), null, 2)
            this.mainEditor.setValue(this.jsonStr)
          }
        } else {
          this.jsonStr = JSON.stringify(json5.parse(this.jsonStr), null, 2)
          this.mainEditor.setValue(this.jsonStr)
        }
      })
    },
    initSubEditor () {
      this.$nextTick(() => {
        if (this.subEditor) {
          this.subEditor.setValue(this.subJsonStr)
          return
        }
        this.subEditor = editor.create(this.$refs.subEditorRef, {
          language: 'json',
          value: this.subJsonStr || '',
          automaticLayout: true,
          minimap: {
            enabled: false
          },
          scrollbar: {
            vertical: 'auto',
            verticalSliderSize: 5,
            verticalScrollbarSize: 5
          },
          lineNumbers: false,
          readOnly: true,
          overviewRulerBorder: false,
          tabSize: 2,
          autoIndent: true,
          contextmenu: false,
          wordWrap: 'on',
          formatOnPaste: true
        })
      })
    },
    changeField () {
      if (this.field) {
        this.currentAction = 'field'
      } else {
        this.currentAction = ''
      }
      let r = eval('this.jsonData' + this.field)
      let _type = Object.prototype.toString.call(r)
      if (_type == '[object Array]' || _type == '[object Object]') {
        this.subJsonStr = JSON.stringify(r, null, 2)
      } else if (_type == '[object Undefined]' || _type == '[object Null]') {
        this.subJsonStr = '// ' + r
      } else {
        this.subJsonStr = r
      }
      this.initSubEditor()
    },
    urlFormat (url) {
      if (url.indexOf('?') < 0) return {}
      let _params = decodeURIComponent(url).substring(url.indexOf('?') + 1).split('&')
      let outObj = {}
      _params.forEach(item => {
        if (!outObj.hasOwnProperty(item.split('=')[0])) {
          outObj[item.split('=')[0]] = item.split('=')[1]
        }
        return item
      })
      return outObj
    }
  }
}
</script>

<style lang="less">
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .main {
    position: relative;
    width: 100%;
    height: calc(~"100% - 36px");
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    &_editor {
      // flex: 1;
      height: 100%;
    }
    &_editor_placeholder {
      position: absolute;
      left: 62px;
      top: 20px;
      width: 400px;
      height: 24px;
      font-size: 14px;
      color: #aaa;
      font-weight: 200 !important;
      pointer-events: none;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &_append {
      width: 50%;
      height: 100%;
      border-left: 1px solid #eee;
      box-sizing: border-box;
      z-index: 1;
      .sub_editor {
        height: 100%;
      }
    }
  }
  .footer {
    width: 100%;
    height: 36px;
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    &_prepend {
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      border-right: 1px solid #eee;
      background-color: #f8f8f8;
      color: #888;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    &_input {
      flex: 1;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      input {
        width: 100%;
        border: none;
        color: #666;
        &::placeholder {
          color: #c8c8c8;
        }
      }
    }
    &_append {
      width: 108px;
      height: 100%;
      border-left: 1px solid #eee;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-content: center;
      > div {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      &_item {
        width: 36px;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        svg {
          width: 18px;
          height: 18px;
          fill: #aaa;
        }
        &:hover {
          svg {
            fill: #666;
          }
        }
        &.active {
          svg {
            fill: #007392;
          }
          &:hover {
            svg {
              fill: #007392;
            }
          }
        }
      }
    }
  }
}
</style>
