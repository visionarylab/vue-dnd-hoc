<template>
  <div
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      fontWeight: val.fontWeight ? 'bold' : 'normal'
    }"
  >
    <gauge
      :endpoint="val.endpoint"
      :options="val.options"
      :id="val.uuid"
      class="no-events"/>
  </div>
</template>

<script>
import params from './params.vue'
import gauge from './gauge.vue'

const WIDGET_NAME = 'cs-gauge'

export default {
  name: WIDGET_NAME,
  components: { gauge },
  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-compass">
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
  </svg>`,
  title: 'Gauge',
  panel: { 'params': params },
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 98,
    height: 95,
    left: 1,
    top: 1,
    z: 0,
    lineHeight: 1.6,
    fontSize: 0.4,
    fullScreen: true,
    refresh: true,
    fontWeight: false,
    color: '#000000',
    textAlign: 'left',
    text: 'Text',
    href: '',
    belong: 'page',
    animationName: '',
    autoResize: true,
    resizableRows: true,
    title: 'Gauge Meter',
    subTitle: '',
    headerEnabled: true,
    padding: 15,
    x: 0,
    y: 0,
    w: 6,
    h: 9,
    endpoint: 'https://jsonplaceholder.typicode.com/users/',
    options: ''
  },
  props: ['val', 'h', 'w', 'playState'],
  methods: {
    rowClicked (e, row) {
      this.$store.commit('vdh/updateData', {
        uuid: this.val.uuid,
        key: 'selectedRow',
        value: this.val.selectedRow
      });
    },
    processOptions (options) {
      if (options[0] === '[') {
        return {columns: JSON.parse(options)}
      } else {
        return {columns: JSON.parse('[' + options + ']')}
      }
    }
  }
}
</script>

<style scoped>
  .no-events {
    pointer-events:none;
  }
</style>
