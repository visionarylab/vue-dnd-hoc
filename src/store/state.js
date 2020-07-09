export default {
  top: 0,
  zoom: 100,
  type: 'page',
  index: -1,
  uuid: -1,
  counter: 0,

  originX: 0,
  originY: 0,
  startX: 0,
  startY: 0,
  moving: false,

  animation: [],
  playState: false,

  activeElement: {},
  page: {
    page: true,
    title: 'Page',
    height: 720,
    endTime: new Date(),
    backgroundColor: '#fff'
  },
  widgets: [],

  mode: ''
}
