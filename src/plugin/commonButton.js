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
    requestParam: {
      type: Object,
      default: () =>({}),
    },
  },
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
      this.buttonLoading = true;
      let _this = this;
      this.$axios.post(this.url, this.requestParam,
        function (resp) {
          _this.$Message.success({
            content: resp.message,
            duration: 5,
          });
          _this.buttonLoading = false;
        },
        function (err) {
          _this.$Message.error({
            content: err.message,
            duration: 5,
          });
          _this.buttonLoading = false;
        });
    },
  },
  render(h) {
    return this.render_submit(h);
  },
}
