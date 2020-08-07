export default {
  data: () => ({
    buttonLoading: false,
    showModal: false,
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
    confirmMessage: {
      type: String,
      default: 'Are you sure?',
    },
    showConfirm: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    render_submit(h) {
      return h(
        'Button', {
          attrs:{
            id:'submitButton',
          },
          props: {
            loading: this.buttonLoading,
            // type: 'success',
            // ghost: true,
            background: true,
          },
          on: {
            click: () => {
              if (this.showConfirm) {
                this.showModal = true;
              } else {
                this.request();
              }
              this.$emit('consumeMethod');
            },
          }
        }, [this.submitName]
      );
    },
    render_modal(h) {
      return h('Modal',
        {
          props: {
            value: this.showModal,
            closable: false,
            'mask-closable': false,
            styles: {
              top:'35%',
            },
          },
          on: {
            'on-ok': () => {
              this.showModal = false;
              this.request();
            },
            'on-cancel': () => {
              this.showModal = false;
            }
          }
        }, this.confirmMessage,
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
        content: resp.message,
        duration: 3,
      });
      this.buttonLoading = false;
    },
    error(err) {
      this.$Message.error({
        content: err.message,
        duration: 5,
        closable: true,
      });
      this.buttonLoading = false;
    }
  },
  render(h) {
    return h('div', {}, [
      this.render_submit(h),
      this.render_modal(h),
    ]);
  },
}
