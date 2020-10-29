export default {
  name: 'api101',
  render(h) {
    return h('div', {}, [
        h('iframe', {
          attrs: {
            src: process.env.API_URL + ":9090" + '/hsb101/swagger-ui.html',
            width: '100%',
            height: '728px'
          }
        })
      ]
    )
  }
}
