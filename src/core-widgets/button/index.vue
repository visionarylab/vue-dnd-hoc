<template>
  <button
    :class="[playState ? 'anm-' + val.animationName : '']"
    :style="{
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      backgroundColor: val.bgColor,
      backgroundImage: 'url(' + val.backPic + ')',
      color: val.color
    }"
    contenteditable="true"
    @blur="(e) => updateText(e, val.uuid)"
    v-html="val.text"/>
</template>

<script>
import vpd from '../../../src/mixins/vpd'
import stylec from './style.vue'
const WIDGET_NAME = 'braid-button'

export default {
  name: WIDGET_NAME,
  mixins: [vpd],
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>',
  title: 'Button',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    name: '',
    width: 250,
    height: 60,
    left: 50,
    top: 0,
    z: 0,
    bgColor: '#000000',
    backPic: '',
    backPicUrl: '',
    color: '#ffffff',
    text: 'Button',
    belong: 'page',
    animationName: ''
  },
  props: ['h', 'w', 'val', 'playState'],
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
.lz-container {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
</style>
