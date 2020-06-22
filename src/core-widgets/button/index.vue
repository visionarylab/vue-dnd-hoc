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
    contenteditable="false"
    v-html="val.text"/>
</template>

<script>
import vpd from '../../../src/mixins/vpd'
import csButtonStyle from './style.vue'
import csButtonParams from './params.vue'

const WIDGET_NAME = 'cs-button'

export default {
  name: WIDGET_NAME,
  mixins: [vpd],
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>',
  title: 'Button',
  panel: { 'style': csButtonStyle, 'params': csButtonParams },
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
  props: ['h', 'w', 'val', 'playState']
}
</script>

<style scoped>
.lz-container {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
</style>
