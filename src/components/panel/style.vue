<template>
  <div
    v-if="!activeElement.page && tab === 1"
    class="panel-wrap">
    <div class="panel-row">
      <vpd-icon name="layers" />
      <div class="panel-label">{{ $t('data.names.padding') }}</div>
      <div class="panel-value">{{ activeElement.padding }}</div>
      <div class="panel-slider-wrap">
        <vpd-slider
          v-model="activeElement.padding"
          :step="1"
          :min="10"
          :max="20" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="more-vertical" />
      <div class="panel-label">{{ $t('data.names.height') }}</div>
      <div class="panel-value">
        <label class="form-switch">
          <input
            v-model="activeElement.fixedHeight"
            type="checkbox"
          >
          <i class="form-icon"/>
        </label>
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="maximize" />
      <div class="panel-label">{{ $t('data.names.fullScreen') }}</div>
      <div class="panel-value">
        <label class="form-switch">
          <input
            v-model="activeElement.fullScreen"
            type="checkbox"
          >
          <i class="form-icon"/>
        </label>
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="refresh-ccw" />
      <div class="panel-label">{{ $t('data.names.refresh') }}</div>
      <div
        class="panel-value"
        style="float: right">
        <label class="form-switch">
          <input
            v-model="activeElement.refresh"
            type="checkbox"
          >
          <i class="form-icon"/>
        </label>
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="type" />
      <div class="panel-label">{{ $t('data.names.headerEnabled') }}</div>
      <div
        class="panel-value"
        style="float: right">
        <label class="form-switch">
          <input
            v-model="activeElement.headerEnabled"
            type="checkbox"
          >
          <i class="form-icon"/>
        </label>
      </div>
    </div>

    <component
      v-for="(item, i) in widgetStyle"
      :is="widgetStyle[i]"
      :key="i"
      :active-element="activeElement" />

    <div v-if="activeElement.isChild">
      <hr>
      <div class="panel-row">
        <vpd-icon name="layout" />
        <div class="panel-label">{{ $t('data.names.belonging') }}</div>
        <div class="panel-value">
          <select v-model="activeElement.belong">
            <option>page</option>
            <option
              v-for="(val, index) in containerName"
              :key="index">{{ val }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import widget from '../../plugins/widget'

export default {
  name: 'PanelStyle',
  props: ['activeElement', 'tab'],
  data () {
    return {}
  },

  computed: {
    widgetStyle () {
      return widget.getWidgetStyle(this.activeElement)
    },

    height () {
      return this.$store.state.vdh.page.height
    },

    containerName () {
      var arr = []
      this.$store.state.vdh.widgets.map(
        val => val.isContainer && val.name && arr.push(val.name)
      )
      return arr
    }
  },

  methods: {
    getActiveContainer () {
      return this.$store.state.vdh.widgets.filter(val => val.isContainer && val.name === this.activeElement.belong)[0]
    }
  }
}
</script>
