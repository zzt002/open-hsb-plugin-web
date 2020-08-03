export default {
  name: 'rabbit',
  render(h) {
    return h('div',{},[
      h('iframe', {
        attrs: {
          src: 'http://localhost:15672',
          width: '100%',
          height:'728px'
        }
      })]
    )
  },
}
