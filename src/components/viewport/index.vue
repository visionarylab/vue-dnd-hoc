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

      <component
        v-for="val in widgetStore"
        :is="val.type"
        :data-title="val.type"
        :class="{'g-active': (id === val.uuid && mode === 'edit'), 'layer': (mode === 'edit') }"
        :key="val.uuid"
        :val="val"
        :h="height"
        :w="1280"
        :data-type="val.type"
        :data-uuid="val.uuid"
        :play-state="playState"
        :id="val.uuid"
        @mouseenter.native="showDelBtn(val.uuid)"
        @mouseleave.native="hideDelBtn(val.uuid)">
        <component
          v-for="child in getChilds(val.name)"
          :is="child.type"
          :data-title="child.type"
          :class="{'g-active': id === child.uuid && mode === 'edit', 'layer': (mode === 'edit') }"
          :key="child.uuid"
          :val="child"
          :h="val.height"
          :w="val.width"
          :data-type="child.type"
          :data-uuid="child.uuid"
          :play-state="playState"
          :id="child.uuid"
          class="layer-child"
          @mouseover.native="showDelBtn(child.uuid)"
          @mouseleave.native="hideDelBtn(child.uuid)" />
      </component>

      <ref/>

      <!-- <control/> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ref from './ref-lines.vue'
import control from './size-control.vue'
import { move } from '../../mixins'
import vpd from '../../mixins/vpd'
import overlayBtn from './overlay-btn.vue'

export default {
  name: 'Viewport',
  components: {
    ref: ref, // 参考线
    control: control // 尺寸控制
  },

  mixins: [move, vpd],

  props: ['zoom'],

  data () {
    return {
      deleteIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use xlink:href="#trash-2"><svg viewBox="0 0 24 24" width="24" height="24" id="trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></use></svg>'
    }
  },

  computed: {
    widgetStore () {
      return this.$vpd.state.widgets.filter(item => item.belong === 'page')
    },

    height () {
      return this.$vpd.state.page.height
    },

    backgroundColor () {
      return this.$vpd.state.page.backgroundColor
    },

    id () {
      // var type = this.$vpd.state.type
      // var index = this.$vpd.state.index
      // index = index >= 0 ? index : ''
      // return type + index
      return this.$vpd.state.uuid
    },

    playState () {
      return this.$vpd.state.playState
    },

    mode () {
      return this.$vpd.state.mode
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
        var target = this.$vpd.state.activeElement

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

        this.$vpd.commit('select', {
          uuid: uuid || -1
        })

        target = this.$vpd.state.activeElement
        if (target.belong === 'page' && target.dragable && this.mode === 'edit') {
          this.initmovement(e) // 参见 mixins
        }
      } else {
        this.$vpd.commit('select', {
          uuid: -1
        })
      }
    },

    replaceImage (e) {
      if (this.$vpd.state.activeElement.isUpload) {
        this.$vpd.$emit('upload', payload => {
          this.$vpd.commit('replaceImage', payload)
        })
      }
    },

    getChilds (name) {
      return this.$vpd.state.widgets.filter(
        item => item.belong === name
      )
    },

    setScreenDimensions () {
      const body = document.querySelector('body')
      this.$refs.screen.style.width = body.offsetWidth + 'px'
      this.$refs.screen.classList.add('screen-transition')
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
    },

    showDelBtn (uuid) {
      const component = document.getElementById(uuid)
      const componentType = component.getAttribute('data-type')
      if (!document.getElementById('btn-' + uuid)) {
        var OverlayBtnClass = Vue.extend(overlayBtn)
        const vm = new OverlayBtnClass({
          propsData: { uuid, componentType }
        }).$mount()
        component.appendChild(vm.$el)
      }
    },

    hideDelBtn (uuid) {
      document.getElementById(uuid).querySelectorAll('#btn-' + uuid).forEach(n => n.remove());
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
  font-size: 0;
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
  width: 1280px;
  transform-origin: center top;
  position: relative;
}
.screen-transition {
  transition: all 0.8s ease-in-out;
}
</style>
