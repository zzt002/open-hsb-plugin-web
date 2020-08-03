export default {
  name: 'rabbit',
  render(h) {
    return h('div',{},[
      h('iframe', {
        props: {
          src: 'http://localhost:15672',
        }
      })]
    )
  },
}
