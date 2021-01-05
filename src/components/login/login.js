import commonForm from '../../plugin/commonForm'
import {isLogin} from '../../plugin/storage'
import {rainy} from '../../plugin/codeRain'

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
            padding: '40px',
            position: 'fixed',
            left: '50%',
            top: '50%',
            margin: '-125px -175px',
            width: '350px',
            opacity: '0.9'
          }
        }, [
          h('commonForm', {
            props: {
              params: this.params,
              url: '/login',
              method: 'post',
              submitName: '登录',
            }
          }, [])
        ]
      );
    },
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
      //   rainy(),
         this.render_login(h)
      ]
    );
  },
  created() {
    if (isLogin()) {
      this.$router.push('/');
    }
  }
}
