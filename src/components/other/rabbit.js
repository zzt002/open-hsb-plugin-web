export default {
  name: 'rabbit',
  render(h) {
    return h('div',{},[
      h('iframe', {
        attrs: {
          src:  process.env.API_URL + ':15672',
          width: '100%',
          height:'728px'
        }
      })]
    )
  },
}
