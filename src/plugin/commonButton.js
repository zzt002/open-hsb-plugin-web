export default {
  data: () => ({
    buttonLoading: false,
  }),
  props: {
    submitName: {
      type: String,
      default: '提交',
    },
    url: {
      type: String,
      default: '',
    },
    params: {
      type: Object,
      default: () => ({}),
    },
  }
  ,
  methods: {
    render_submit(h) {
      return h(
        'Button', {
          props: {
            loading: this.buttonLoading,
          },
          on: {
            click: () => {
              this.post();
            }
          }
        }, [this.submitName]
      );
    },
    post() {
      console.log('请求路径:' + this.url);
      console.log('请求参数:' + JSON.stringify(this.params));
      let _this = this;
      _this.buttonLoading = true;
      this.$axios.post(this.url, this.params,
        function (resp) {
          let successMessage = _this.$emit('successMessage', resp);
          console.log("Object:" + successMessage);
          _this.$Message.success({
            content: successMessage,
            duration: 5,
          });
          _this.buttonLoading = false;
        },
        function (err) {
          _this.$Message.error({
            content: err.message,
            duration: 0,
            closable: true,
          });
          _this.buttonLoading = false;
        });
    },
  },
  render(h) {
    return this.render_submit(h);
  },
}
