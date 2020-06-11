<template>
  <div
    :class="[playState ? 'anm-' + val.animationName : '']"
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      left: val.left / w * 100 + '%', // val.belong === 'page' ? val.left / w * 100 + '%' : '0',
      top: val.top / h * 100 + '%', // val.belong === 'page' ? val.top / h * 100 + '%' : '0',
      width: val.width / w * 100 + '%',
      minHeight: val.height / h * 100 + '%',
      zIndex: val.z,
      lineHeight: val.lineHeight,
      fontSize: val.fontSize + 'rem',
      color: val.color,
      textAlign: val.textAlign,
      fontWeight: val.fontWeight ? 'bold' : 'normal'
    }"
    class="txt"
    contenteditable="true"
    @blur="(e) => updateText(e, val.uuid)"
    v-html="val.text"
  />
</template>

<script>
import braidTxtStyle from './style.vue'
const WIDGET_NAME = 'braid-txt'

export default {
  name: WIDGET_NAME,
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',
  title: 'Text',
  panel: braidTxtStyle,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 650,
    height: 100,
    left: 50,
    top: 0,
    z: 0,
    lineHeight: 1.6,
    fontSize: 1.2,
    fontWeight: false,
    color: '#000000',
    textAlign: 'left',
    text: 'Text',
    href: '',
    belong: 'page',
    animationName: ''
  },
  props: ['val', 'h', 'w', 'playState'],
  computed: {
    widgetStore () {
      return this.$vpd.state.widgets.filter(item => item.belong === 'page')
    }
  },
  methods: {
    updateText (e, uuid) {
      let text = e.target.innerHTML
      if (this.widgetStore.find(widget => { return widget.uuid === uuid })) { // check if widget is present in store with matchinh uuid. Only then Update Data
        this.$vpd.commit('updateData', {
          uuid: uuid,
          key: 'text',
          value: text
        })
      }
    }
  }
}
</script>

<style scoped>
  .txt {
    outline: none;
    font-size: 28px;
  }
</style>
