import myInput from '../plugin/myInput'
export default {
  name: 'openIp',
  components: {
    myInput
  },
  data: () => ({
    loading: false,
    param: {
      serviceStr: '',
      ipStr: '',
    }
  }),
  methods: {
    render_input(h) {
      return h('div',{

      },[
        this.render_service(h),
        this.render_ip(h),
      ]);
    },
    render_service(h) {
      return h('div', {}, [
          h('h3',{}, '服务信息'),
          h('Input', {
            props:{'value': this.param.serviceStr},
            on: {
              'on-change': (event) => {
                this.param.serviceStr = event.target.value;
              }
            }
          }, []),
        ]
      );
    },
    render_ip(h) {
      return h('div', {}, [
          h('h3',{}, 'IP信息'),
          h('Input', {
            props:{'value': this.param.ipStr},
            on: {
              'on-change': (event) => {
                this.param.ipStr = event.target.value;
              }
            }
          }, []),
        ]
      );
    },
    render_submit(h) {
      return h(
        'Button', {
          props: {
            loading: this.loading,
          },
          on: {
          click: ()=>{
            this.post();
          }
          }}, ['提交']
      );
    },
    post() {
      this.$axios({
        url: '/api/esbServiceConsumer/openIp',
        params: this.param,
        method: 'post',
      }).then((resp) => {
        alert(resp.data);
      }).catch((ex) => {
        alert(ex.message);
      });
    }
  },
  render(h) {
    return h('div',{},[
        this.render_input(h),
        this.render_submit(h),
    ]);
  }
}
