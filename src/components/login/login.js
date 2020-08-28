import commonForm from '../../plugin/commonForm'
import {isLogin} from '../../plugin/storage'

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
    code_rain() {
      let can = document.createElement("canvas");
      can.id = "canvas";
      can.style.position="fixed";
      can.style.left="0";
      can.style.top="0";
      can.style.zIndex="-1";
      can.style.opacity="1";
      document.body.appendChild(can);

      let width = document.getElementById("canvas").width = screen.width;
      let height = document.getElementById("canvas").height = screen.height;
      let ctx = document.getElementById("canvas").getContext("2d");
      let arr = Array(Math.ceil(width / 10)).fill(0);
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

      function rain() {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#0f0";
        arr.forEach(function (value, index) {
          ctx.fillText(str[Math.floor(Math.random() * str.length)], index * 10, value + 10);
          arr[index] = value >= height || value > 8888 * Math.random() ? 0 : value + 10;
        });
      }
      setInterval(rain, 30);
    }
  },
  render(h) {
    return h('div', {
        // style: {
        //   background: 'url(' + require('../../assets/bg1.jpg') + ') no-repeat center center',
        //   position: 'fixed',
        //   top: 0,
        //   left: 0,
        //   width: '100%',
        //   height: '100%',
        // },
      },
      [
        this.code_rain(),
        this.render_login(h)
      ]
    );
  },
  created() {
    // this.code_rain();
    if (isLogin()) {
      this.$router.push('/');
    }
  }
}
