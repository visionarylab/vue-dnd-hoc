<template>
  <div
    v-if="showtoolbar"
    id="menu-bar"
    class="menu-bar">
    <ul class="tab tab-block panel-tab">
      <li
        :class="{active: activeTab === 1}"
        class="tab-item"
        @click="activeTab = 1">
        <a>{{ $t('data.components') }}</a>
      </li>
      <li
        :class="{active: activeTab === 2}"
        class="tab-item"
        @click="activeTab = 2">
        <a>{{ $t('data.custom_components') }}</a>
      </li>
    </ul>

    <div
      v-show="activeTab === 1"
      class="tabcontent">
      <div @mousedown="updateSrollTop">
        <ul class="widget-list rows">
          <li
            v-for="item in widgets"
            :key="item.name"
            class="menu-item col"
            @click="(e) => {addWidget(e, item)}">
            <vpd-icon
              :svg="item.icon"
              :title="item.title" />
            <span class="menu-caption">{{ item.title }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-show="activeTab === 2"
      class="tabcontent">
      <div @mousedown="updateSrollTop">
        None
      </div>
    </div>
  </div>
</template>

<script>
import widget from '../plugins/widget'
import { move } from '../mixins'

export default {
  mixins: [move],
  props: ['zoom', 'showtoolbar'],
  data () {
    return {
      activeTab: 1
    }
  },
  computed: {
    widgets () {
      return widget.getWidgets()
    },
    layers () {
      return this.$store.state.vdh.widgets
    }
  },
  methods: {
    addWidget (e, item) {
      this.$store.dispatch('vdh/addWidget', item)
    },

    updateSrollTop () {
      var top = document.getElementById('viewport').scrollTop / this.zoom * 100
      this.$store.commit('vdh/updateSrollTop', top)
    }
  }
}
</script>

<style lang="scss">
@import '../_variables.scss';
.rows {
  display:grid;
  grid-template-columns: 100px;
  grid-row: auto;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
}
.menu-bar {
  ul {
    list-style: none;
    margin: 0;
  }
  details {
    padding: 10px;
  }
  summary {
    padding: 5px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 4px;
    .svg-icon {
      margin-right: 5px;
    }
  }
  .tabcontent {
    padding: 10px;
  }
  transition: all 0.2s;
}
.widget-list {
  padding: 0;
}
.menu-item {
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  padding: 15px 0 8px;
  transition: all 0.2s;
  position: relative;
  height: 72px;
  &:hover {
    transform: scale(1.2);
  }
  .svg-icon {
    font-size: 24px;
  }
  .menu-caption {
    display: block;
    font-size: 12px;
    width: 100%;
  }
}
.layer-list {
  padding: 10px;
  li {
    text-align: left;
    cursor: pointer;
    white-space: nowrap;
    line-height: 24px;
    padding-left: 5px;
    &:hover {
      background: #f5f5f5;
    }
    &::before {
      content: '› ';
    }
    &.layer-active {
      color: $light-color;
      background: $primary-color;
    }
  }
}
.tab-item {
  background-color: #fff;
}

</style>
