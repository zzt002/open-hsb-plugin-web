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
    method: {
      type: String,
      default: 'get',
    },
    params: {
      type: Object,
      default: () => ({}),
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
              this.request();
            }
          }
        }, [this.submitName]
      );
    },
    request() {
      let _this = this;
      _this.buttonLoading = true;
      this.$axios.ajax(this.url, this.method, this.params,
        function (resp) {
          _this.$emit('afterSuccess');
          _this.success(resp);
        },
        function (err) {
          _this.error(err);
        });
    },
    success(resp) {
      this.$Message.success({
        content:  resp.message,
        duration: 5,
      });
      this.buttonLoading = false;
    },
    error(err) {
      this.$Message.error({
        content: err.message,
        duration: 0,
        closable: true,
      });
      this.buttonLoading = false;
    }
  },
  render(h) {
    return this.render_submit(h);
  },
}
