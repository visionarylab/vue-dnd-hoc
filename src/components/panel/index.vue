<template>
  <div>
    <ul class="tab tab-block panel-tab">
      <li
        :class="{active: activeTab === 1}"
        class="tab-item"
        @click="activeTab = 1"><a>{{ $t('data.names.style') }}</a></li>
      <li
        :class="{active: activeTab === 2}"
        class="tab-item"
        @click="activeTab = 2"><a>{{ $t('data.names.params') }}</a></li>
        <!-- <li
        :class="{active: activeTab === 3}"
        class="tab-item"
        @click="activeTab = 3"><a>{{ $t('data.names.animation') }}</a></li> -->
    </ul>

    <page
      :active-element="activeElement"
      :tab="activeTab"/>
    <appearance
      :active-element="activeElement"
      :tab="activeTab"/>
    <params
      :active-element="activeElement"
      :tab="activeTab"/>
    <animation
      :active-element="activeElement"
      :tab="activeTab"/>

    <details
      open
      class="tree-view">
      <summary><vpd-icon name="layers" />{{ $t('data.added_components') }}</summary>
      <ul class="layer-list">
        <li
          v-for="layer in layers"
          :class="{'layer-active': layer === activeElement}"
          :key="layer.uuid"
          @click="(e) => {activeLayer(e, layer)}">{{ getWidgetTitle(layer.type) }}</li>
      </ul>
    </details>
  </div>
</template>

<script>
import page from './page.vue'
import style from './style.vue'
import params from './params.vue'
import animation from './animation.vue'
import vpd from '../../mixins/vpd'
import widget from '../../plugins/widget'
import { cumulativeOffset, checkInView } from '../../utils/offset'

export default {
  components: {
    page: page,
    appearance: style,
    params: params,
    animation: animation
  },
  mixins: [vpd],

  data () {
    return {
      activeTab: 1
    }
  },

  computed: {
    activeElement () {
      return this.$vpd.state.activeElement
    },

    layers () {
      return this.$vpd.state.widgets
    },

    widgets () {
      return widget.getWidgets()
    }
  },

  methods: {
    activeLayer (e, item) {
      this.$vpd.commit('select', {
        uuid: item.uuid
      })
      let viewport = document.querySelector('#viewport')
      let target = viewport.querySelector(`[data-uuid='${item.uuid}']`)
      if (target && !checkInView(target)) {
        viewport.scrollTop = (cumulativeOffset(target).top - 50) * this.zoom / 100
      }
    },

    getWidgetTitle (type) {
      return this.widgets[type].title || ''
    }
  }
}
</script>

<style lang="scss">
@import '../../_variables.scss';
.panel-tab {
  padding: 0;
}
.panel-wrap {
  height: calc(100% - 280px);
  padding: 15px 20px;
  position: relative;
  overflow-y: auto;
  border: 10px solid #eff0f2;
  .btn-action {
    background-color: none;
    border: none;
    border-radius: 50%;
  }
  .btn-action:hover {
    background-color: #f5f5f5;
  }
}
.panel-row {
  display: flex;
  font-size: 13px;
  line-height: 36px;
}
.panel-row .svg-icon {
  font-size: 16px;
  color: $gray-color;
}
.panel-label {
  display: inline-block;
  width: 85px;
  height: 36px;
  padding-left: 6px;
  color: #999;
}
.panel-value {
  min-width: 70px;
  display: flex;
  align-items: center;
}
.panel-slider-wrap {
  flex-grow: 1;
  padding: 6px 5px;
  opacity: 0;
  transition: opacity 0.3s;
}
.panel-row:hover .panel-slider-wrap {
  opacity: 1;
}
.panel-cell {
  flex-grow: 1;
}
.panel-wrap input:checked ~ .svg-icon svg {
  stroke: #333;
}
.panel-select {
  width: 100%;
  height: 32px;
  border: 1px solid #ccc;
}
.panel-wrap hr {
  margin: 20px 0;
  border-top: 10px solid #eff0f2;
  margin-left: -21px;
  margin-right: -20px;
}
.panel-wrap select,
.panel-wrap input[type="text"] {
  width: 100%;
}
.panel-preview {
  width: 50px;
  height: 32px;
  background: no-repeat center/100%;
  cursor: pointer;
}
.tree-view {
  border: 10px solid #eff0f2;
  padding: 0 10px;
  position: absolute;
  height: 250px;
  bottom: 0;
  width: 340px;
  background-color: #fff;
  ul {
    list-style: none;
    margin: 0;
  }
  summary {
    padding: 5px 0 0 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 4px;
    .svg-icon {
      margin-right: 5px;
    }
  }
}
.tab {
  margin-bottom: 0!important;
}
</style>
