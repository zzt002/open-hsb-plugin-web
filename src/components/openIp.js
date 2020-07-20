import myInput from '../plugin/myInput'
export default {
  name: 'openIp',
  components: {
    myInput
  },
  data: () => ({
    buttonLoading: false,
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
            loading: this.buttonLoading,
          },
          on: {
            click: ()=>{
              this.post1();
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
    },
    post1() {
      this.buttonLoading = true;
      let that = this;
      let url = '/api/esbServiceConsumer/openIp';
      this.$axios.post(url, this.param,
        function(resp) {
          that.$Message.success(resp.data);
          that.buttonLoading = false;
        },
        function(err) {
          that.$Message.error(err.message);
          that.buttonLoading = false;
        });
    },
  },
  render(h) {
    return h('div',{},[
        this.render_input(h),
        this.render_submit(h),
    ]);
  }
}
