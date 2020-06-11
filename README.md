# vue-dnd-hoc

A drag-and-drop editor for higher order components.

## Demo 🚀

[vue-dnd-hoc.netlify.app](https://vue-dnd-hoc.netlify.app)

<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-light.svg"/>
</a>


## Install

```bash
yarn add vue-dnd-hoc
```

You can start it quickly, in main.js:

```js
import Vue from 'vue';
import vueDndHoc from 'vue-dnd-hoc'
import 'vue-dnd-hoc/dist/vue-dnd-hoc.css'
import App from './App.vue';

Vue.use(vueDndHoc);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

Next, use it:

```html
<template>
  <div id="app">
    <vue-dnd-hoc />
  </div>
</template>

<style>
#app {
  height: 100%;
}
</style>
```

# Options

You can add custom components, save callback.

| Props | Type | Description |
| -------- | -------- | -------- |
| value | `Object` | Editor initial value, you can pass the value of the save callback and resume the draft |
| widgets | `Object` | Vue Components. Custom components for editor. see [Example](https://github.com/fireyy/vue-page-designer-widgets/blob/master/src/index.js) |
| save | `(data) => void` | When you click the Save button, feed back to you to save the data |
| upload | `(files) => Promise` | Editor upload function, allowing you to implement your own upload-file's request |

## Parameter: `value`

The `value` came from `save`.

```html
<template>
  <div id="app">
    <vue-dnd-hoc :value="value" />
  </div>
</template>
```

## Parameter: `widgets`

You can install default widget in `vue-page-designer-widgets`

```bash
yarn add vue-page-designer-widgets
```

Import and use it

```html
<template>
  <div id="app">
    <vue-dnd-hoc :widgets="widgets" />
  </div>
</template>
<script>
import widgets from './widgets'

export default {
  data () {
    return {
      widgets
    }
  }
}
</script>
```

## Parameter: `save`

```html
<template>
  <div id="app">
    <vue-dnd-hoc @save="(data) => { console.log('send the value data to your server', data) }" />
  </div>
</template>
```

## Parameter: `upload`

```html
<template>
  <div id="app">
    <vue-dnd-hoc :upload="upload" />
  </div>
</template>
<script>
export default {
  methods: {
    upload (files) {
      return yourApiUpload(files).then(res => {
        return res.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
```
# Credits

A big thanks to the team behind the project [vue-page-designer](https://github.com/fireyy/vue-page-designer), which was taken as base implementation for this project.