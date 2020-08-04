export default {
  name: 'api',
  render(h) {
    return h('div',{},[
      h('iframe', {
        attrs: {
          src: this.baseUrl + ':9090/swagger-ui.html',
          width: '100%',
          height:'728px'
        }
      })]
    )
  },
}
