<template>
  <div
    :style="{
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z
    }"
    contenteditable="false">
    <button
      :style="{
        position: 'absolute',
        width: 100 + '%',
        height: 100 + '%',
        left: 0,
        top: 0,
        zIndex: val.z,
        backgroundColor: val.bgColor,
        backgroundImage: 'url(' + val.backPic + ')',
        color: val.color
      }"
      class="no-events"
      v-html="val.text"/>
  </div>
</template>

<script>
import csButtonStyle from './style.vue'
import csButtonParams from './params.vue'

const WIDGET_NAME = 'cs-button'

export default {
  name: WIDGET_NAME,
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
    width: 95,
    height: 95,
    left: 1,
    top: 0,
    z: 0,
    bgColor: '#000000',
    backPic: '',
    backPicUrl: '',
    color: '#ffffff',
    text: 'Button',
    belong: 'page',
    animationName: '',
    x: 0,
    y: 0,
    w: 5,
    h: 2
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
.no-events {
  pointer-events:none;
  display: grid;
  align-items: center;
}
</style>
