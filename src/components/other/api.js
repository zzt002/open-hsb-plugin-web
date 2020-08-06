export default {
  name: 'api',
  render(h) {
    return h('div', {}, [
        h('iframe', {
          attrs: {
            src: process.env.API_URL + ":" + process.env.URL_PORT + '/swagger-ui.html',
            width: '100%',
            height: '728px'
          }
        })
      ]
    )
  },
  mounted() {
    console.log("5:" +  process.env.API_URL);
  },
}
