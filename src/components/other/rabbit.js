export default {
  name: 'rabbit',
  render(h) {
    return h('div',{},[
      h('iframe', {
        attrs: {
          src: this.baseUrl + ':15672',
          width: '100%',
          height:'728px'
        }
      })]
    )
  },
}
