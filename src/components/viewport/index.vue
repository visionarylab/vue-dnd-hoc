<template>
  <div
    id="viewport"
    class="holder">
    <div
      ref="screen"
      :style="{
        backgroundColor: backgroundColor,
        height: height + 'px',
        transform: 'scale(' + zoom / 100 + ')'
      }"
      class="screen"
      @dblclick="replaceImage">
      <grid-layout
        :layout="widgetStore"
        :col-num="22"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[5, 5]"
        :use-css-transforms="true">
        <grid-item
          v-for="(item, index) in widgetStore"
          :key="index"
          :auto-size="true"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i">
          <component
            :is="item.type"
            :data-title="item.type"
            :class="{'g-active': (id === item.uuid && mode === 'edit'), 'layer': (mode === 'edit') }"
            :key="item.uuid"
            :val="item"
            :h="100"
            :w="100"
            :data-type="item.type"
            :data-uuid="item.uuid"
            :play-state="playState"
            :id="item.uuid"/>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import ref from './ref-lines.vue'
import control from './size-control.vue'
import { move } from '../../mixins'
import vpd from '../../mixins/vpd'
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  name: 'Viewport',
  components: {
    ref: ref,
    control: control
  },

  mixins: [move, vpd],

  props: ['zoom'],

  data () {
    return {
      deleteIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use xlink:href="#trash-2"><svg viewBox="0 0 24 24" width="24" height="24" id="trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></use></svg>',
      GridLayout,
      GridItem
    }
  },

  computed: {
    widgetStore () {
      return this.$store.state.vdh.widgets.filter(item => item.belong === 'page')
    },

    height () {
      return this.$store.state.vdh.page.height
    },

    backgroundColor () {
      return this.$store.state.vdh.page.backgroundColor
    },

    id () {
      return this.$store.state.vdh.uuid
    },

    playState () {
      return this.$store.state.vdh.playState
    },

    mode () {
      return this.$store.state.vdh.mode
    }
  },

  watch: {
    mode: function (val) {
      this.setScreenDimensions()
    }
  },

  mounted () {
    this.setScreenDimensions()
    document
      .getElementById('viewport')
      .addEventListener('mousedown', this.handleSelection, false)

    document.addEventListener(
      'keydown',
      e => {
        e.stopPropagation()
        var target = this.$store.state.vdh.activeElement

        if (e.keyCode === 37 && target.left) {
          target.left -= 1
          return
        }

        if (e.keyCode === 38 && target.top) {
          e.preventDefault()
          target.top -= 1
          return
        }

        if (e.keyCode === 39 && target.left) {
          target.left += 1
          return
        }

        if (e.keyCode === 40 && target.top) {
          e.preventDefault()
          target.top += 1
        }
      },
      true
    )
  },
  methods: {
    handleSelection (e) {
      var target = e.target
      var type = target.getAttribute('data-type')

      if (type) {
        var uuid = target.getAttribute('data-uuid')

        this.$store.commit('vdh/select', {
          uuid: uuid || -1
        })

        target = this.$store.state.vdh.activeElement
        // if (target.belong === 'page' && target.dragable && this.mode === 'edit') {
        //   this.initmovement(e)
        // }
      } else {
        this.$store.commit('vdh/select', {
          uuid: -1
        })
      }
    },

    replaceImage (e) {
      if (this.$store.state.vdh.activeElement.isUpload) {
        this.$store.$emit('vdh/upload', payload => {
          this.$store.commit('vdh/replaceImage', payload)
        })
      }
    },

    getChilds (name) {
      return this.$store.state.vdh.widgets.filter(
        item => item.belong === name
      )
    },

    setScreenDimensions () {
      const body = document.querySelector('body')
      this.$refs.screen.style.width = body.offsetWidth + 'px'
      console.log('setScreenDimensions -> body.offsetWidth', body.offsetWidth)
      // this.$refs.screen.classList.add('screen-transition')
      if (this.mode === 'edit') {
        this.$refs.screen.style.height = (body.offsetHeight - 57) + 'px'
        let items = document.querySelectorAll('[contenteditable="false"]')
        for (let i = 0; i < items.length; i++) {
          items[i].contentEditable = true
        }
      } else {
        this.$refs.screen.style.height = body.offsetHeight + 'px'
        let items = document.querySelectorAll('[contenteditable="true"]')
        for (let i = 0; i < items.length; i++) {
          items[i].contentEditable = false
        }
      }
    }
  }
}
</script>

<style scoped>
.holder {
  display: flex;
  justify-content: center;
  height: 100%;
  overflow: auto;
  /* font-size: 0; */
  border: 1px solid #f5f5f5;
  border-width: 0 1px;
  background:
      linear-gradient(90deg, #ffffff 23px, transparent 1%) center,
      linear-gradient(#ffffff 23px, transparent 1%) center,
      #bbbbbb;
  background-position: 0 0, 13px 13px;
  background-size: 26px 26px;
}
.screen {
  /* width: 100vw; */
  transform-origin: center top;
  position: relative;
}
.screen-transition {
  transition: all 0.8s ease-in-out;
}
.vue-grid-item {
  background-color: #f7f7f7;
}
.tabulator {
  font-size: 14px;
}
</style>
