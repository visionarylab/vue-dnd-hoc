// widgets
import coreWidgets from '../core-widgets'

var widgets
var widgetPanels = {'style': {}, 'params': {}}

const install = (Vue, config = {}) => {
  if (install.installed) return

  widgets = Object.assign({}, {}, coreWidgets, config.widgets)

  Object.keys(widgets).forEach(key => {
    Vue.component(key, widgets[key])
    Vue.component(key, Vue.extend(widgets[key]))
    // style panel
    if (widgets[key]['panel']) {
      for (const [k, v] of Object.entries(widgets[key]['panel'])) {
        let panel = Object.assign({}, v, { type: key })
        Vue.component(panel.name, Vue.extend(panel))
        widgetPanels[k][panel.name] = panel
      }
      // remove panel from object
      delete widgets[key]['panel']
    }
  })
}

export default {
  install,
  getWidgets () {
    return widgets
  },
  getWidgetStyle (activeElement) {
    const result = {}
    for (const [name, value] of Object.entries(widgetPanels['style'])) {
      if (value.type === activeElement.type) {
        result[name] = value
      }
    }
    return result
  },
  getWidgetParams (activeElement) {
    const result = {}
    for (const [name, value] of Object.entries(widgetPanels['params'])) {
      if (value.type === activeElement.type) {
        result[name] = value
      }
    }
    return result
  }
}
