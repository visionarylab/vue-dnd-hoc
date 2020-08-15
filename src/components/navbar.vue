<template>
  <div>
    <transition name="slide-fade">
      <header
        v-if="mode === 'edit'"
        class="header">
        <div class="navbar container">
          <section class="logo navbar-section">
            <vpd-icon
              name="menu"
              @click="toggleToolBar"/>
          </section>
          <section class="navbar-section">
            <a
              class="btn btn-link tooltip tooltip-bottom"
              data-tooltip="Ctrl + P"
              @click="preview">
              <vpd-icon :svg="previewIcon"/> {{ $t('data.actions.preview') }}
            </a>
            <a
              class="btn btn-link tooltip tooltip-bottom"
              data-tooltip="Ctrl + C"
              @click="copyWidget">
              <vpd-icon name="copy" /> {{ $t('data.actions.copy') }}
            </a>
            <a
              class="btn btn-link tooltip tooltip-bottom"
              data-tooltip="Delete"
              @click="dele">
              <vpd-icon name="trash-2" /> {{ $t('data.actions.delete') }}
            </a>
            <a
              class="btn btn-link tooltip tooltip-bottom"
              data-tooltip="Ctrl + S"
              @click="saveWrapper"><vpd-icon name="save" /> {{ $t('data.actions.save') }}</a>
            <select
              v-model="$i18n.locale"
              class="lang-change">
              <option
                v-for="(lang, i) in langs"
                :key="`Lang${i}`"
                :value="lang">{{ lang }}</option>
            </select>
          </section>
        </div>
      </header>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    save: Function
  },
  data () {
    return {
      langs: ['cn', 'en', 'te'],
      previewIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="12" y1="5" x2="12" y2="17"></line><line x1="12" y1="12" x2="22" y2="12"></line></svg>',
      returnIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><defs><marker id="arrowhead" markerWidth="7" markerHeight="12" fill="#000" refX="0" refY="3.5" orient="auto"><polygon points="0 0, 6 3.5, 0 7" /></marker></defs><line x1="24" y1="12" x2="18" y2="12" stroke="#000" stroke-width="2" marker-end="url(#arrowhead)"/>',
      showToolBar: true
    }
  },
  computed: {
    show () {
      return this.$store.state.vdh.type !== 'page'
    },
    mode () {
      return this.$store.state.vdh.mode
    }
  },
  mounted () {
    document.addEventListener(
      'keyup',
      e => {
        // e.preventDefault()
        e.stopPropagation()
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
          this.copyWidget()
        }
        if (e.key === 'Escape') {
          this.backToEdit()
        }
      },
      true
    )

    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if (e.keyCode === 46) {
          this.dele()
        }
      },
      true
    )

    document.addEventListener(
      'keyup',
      e => {
        // e.preventDefault()
        e.stopPropagation()
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
          this.save()
        }
      },
      true
    )

    document.addEventListener( // Preview Button
      'keydown',
      e => {
        // e.preventDefault()
        e.stopPropagation()
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 80) {
          this.preview()
        }
      },
      true
    )
  },

  methods: {
    saveWrapper () {
      this.$store.dispatch('vdh/save', this.save)
    },

    copyWidget () {
      this.$store.commit('vdh/copy')
    },

    dele () {
      this.$store.commit('vdh/delete')
    },

    preview () {
      this.$store.commit('vdh/mode', 'preview')
    },

    backToEdit () {
      this.$store.commit('vdh/mode', 'edit')
    },

    toggleToolBar () {
      this.showToolBar = !this.showToolBar
      this.$emit('toggleToolBar', this.showToolBar)
    }
  }
}
</script>

<style lang="scss">
@import '../_variables.scss';
.header {
  background-color: #24292e;
  padding: 12px 0;
}
.navbar {
  .svg-icon {
    svg {
      vertical-align: middle;
    }
  }
  .btn.btn-link {
    color: $gray-color;
    margin-right: 15px;
  }
  .btn.btn-link:hover {
    color: $light-color;
  }
  .logo {
    font-size: 20px;
    .svg-icon {
      width: 30px;
      text-align: center;
      background-color: $light-color;
      border-radius: 2px;
    }
  }
  .lang-change {
    width: 80px;
  }
}
.slide-fade-enter-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
