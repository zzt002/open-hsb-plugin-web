import commonForm from '../../plugin/commonForm'

export default {
  name: 'LOGIN',
  components: {
    commonForm
  },
  data: () => ({
    params: [
      {title: '用户名', type: 'Input', key: 'account', value: '', inputType: 'text'},
      {title: '密码', type: 'Input', key: 'password', value: '', inputType: 'password', password: true, clearable: false},
    ]
  }),
  methods: {
    render_login(h) {
      return h('div', {
          style: {
            'background-color': 'gray',
            padding: '50px',
            margin: '250px auto',
            width: '350px',
            opacity: '0.75'
          }
        }, [
          h('commonForm', {
            props: {
              params: this.params,
              url: '/login',
              method: 'post',
              submitName: '登录',
              login: true,
            }
          }, [])
        ]
      );
    }
  },
  render(h) {
    return h('div', {
        style: {
          background: 'url(' + require('../../assets/bg1.jpg') + ') no-repeat center center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
      },
      [
        this.render_login(h)
      ]
    )
      ;
  },
}
