<template>
  <div class="app">
    <navbar :mode="mode"/>
    <div class="body container">
      <div class="columns col-gapless">
        <toolbar
          v-show="modeFromState === 'edit'"
          :zoom="zoom"
          class="toolbar column"/>
        <div class="viewport column">
          <viewport :zoom="zoom"/>
          <div class="zoom-wrap">
            <vpd-slider
              :value="zoom"
              :step="1"
              :tuning="false"
              @input="dozoom" />
            <div class="zoom-value">{{ zoom }}%</div>
          </div>
        </div>
        <panel
          v-show="modeFromState === 'edit'"
          class="control-panel column"/>
      </div>
    </div>
    <vpd-uploader
      :upload="upload"
      :upload-option="uploadOption"/>
    <vpd-toast/>
  </div>
</template>

<script>
import Vue from 'vue'
import widget from './plugins/widget'
import navbar from './components/navbar.vue'
import toolbar from './components/toolbar.vue'
import panel from './components/panel/index.vue'
import viewport from './components/viewport/index.vue'
import loadSprite from './utils/load-sprite'
import vpd from './mixins/vpd'
import toast from './components/toast.vue'
import uploader from './components/uploader.vue'
import slider from './components/slider.vue'
import i18n from './plugins/i18n'
import actions from './store/actions'
import mutation from './store/mutation'
import state from './store/state'
import { getField, updateField } from 'vuex-map-fields';

export default {
  name: 'VueDndHoc',
  i18n: i18n,
  components: {
    navbar,
    toolbar,
    panel,
    viewport,
    [toast.name]: toast,
    [uploader.name]: uploader,
    [slider.name]: slider
  },
  mixins: [vpd],
  props: {
    value: Object,
    widgets: Object,
    upload: Function,
    uploadOption: Object,
    mode: String
  },

  computed: {
    zoom () {
      return this.$store.state.vdh.zoom
    },
    modeFromState () {
      return this.$store.state.vdh.mode
    }
  },
  beforeCreate () {
    // TODO: custom svg path by config
    loadSprite('//unpkg.com/vue-page-designer@0.7.1/dist/icons.svg', 'svgspriteit')
    this.$store.registerModule('vdh', {
      namespaced: true,
      state: state,
      mutations: {
        ...mutation,
        updateField
      },
      actions: actions,
      getters: {
        getField
      }
    })
  },
  created () {
    Vue.use(widget, {
      widgets: this.widgets
    })
    if (this.value) {
      this.$store.commit('vdh/replaceState', this.value)
    }
    this.$vpd.$on('save', () => {
      this.$emit('save', this.$store.state.vdh)
    })
    if (this.mode) {
      this.$store.commit('vdh/mode', this.mode)
    }
  },
  mounted () {
    this.$store.commit('vdh/initActive')
  },

  methods: {
    dozoom (val) {
      this.$store.commit('vdh/zoom', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  // height: calc(100% - 54px);
  overflow: hidden;
  flex-direction: row;
  &.container {
    padding: 0;
  }
  .col-gapless {
    background-color: #eff0f2;
  }
}
.columns {
  height: 100%;
}
.toolbar,
.viewport,
.control-panel {
  height: 100%;
}
.toolbar {
  // background: #fff;
  background-color: #eff0f2;
  user-select: none;
  box-sizing: content-box;
  &.column {
    flex: none;
    width: 225px;
  }
}
.viewport {
  position: relative;
  overflow: hidden;
}
.control-panel {
  background: #fff;
  user-select: none;
  height: calc(100vh - 57px);
  &.column {
    flex: none;
    width: 340px;
  }
}
.zoom-wrap {
  width: 200px;
  height: 30px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}
.viewport:hover .zoom-wrap {
  opacity: 1;
}
.zoom-value {
  position: absolute;
  top: 4px;
  left: -36px;
}
#svgspriteit {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.slide-fade1-enter-active,
.slide-fade2-enter-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade1-leave-active,
.slide-fade2-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade1-enter, .slide-fade1-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade2-enter, .slide-fade2-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0;
}
</style>
