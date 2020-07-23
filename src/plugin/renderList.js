export default {
  name: 'renderList',
  data: () => ({
    buttonLoading: false,
    requestParam: {},
  }),
  props: {
    url: '',
    method: 'get',
    params: {
      type: Array,
      value: [
        {title: 'title', type: 'Input', key: 'key1', value: 'value', inputType:'text'},
        {title: 'title', type: 'Radio', key: 'key2', value: '1', params: [{label: '1', text: '是'}, {label: '0', text: '否'}]},
        {title: 'title', type: 'Switch', key: 'key3', value: 'slot', params: [{slot: 'slot', text: '是'}]},
      ]
    },
  },
  methods: {
    render_list(h) {
      return h('div', {}, this.params.map((param) => {
          let _this = this;
          return h('div', {}, [
            h('h3', {}, param.title),
            (
              function () {
                if (param.type === undefined) {
                  return ;
                } else if (param.type === 'Input') {
                  return _this.render_input(h, param);
                } else if (param.type === 'Select') {
                  return _this.render_select(h, param);
                } else if (param.type === 'Switch') {
                  return _this.render_switch(h, param);
                } else if (param.type === 'Radio') {
                  return _this.render_radio(h, param)
                } else {
                  return;
                }
              }
            )()]);
        })
      );
    },
    render_switch(h, param) {
      return h('i-switch', {
          props: {
            value: (param.value === undefined || param.value === 0) ? false : true,
          },
          on: {
            'on-change': (value) => {
              param.value = value ? 1 : 0;
            }
          }
        }, param.params.map((switchParam) => {
          return h('span', {
            props: {
              slot: switchParam.slot === 1 ? 'open' : 'close',
            }
          }, switchParam.text)
        })
      );
    },
    render_select(h, param) {
      return h('Select', {}, []);
    },
    render_radio(h, param) {
      return h('RadioGroup', {
        props: {
          value: param.value,
        },
        on: {
          'on-change': (_value) => {
            param.value = _value;
          }
        }
      }, param.params.map((radioParam) => {
        return h('Radio', {
          props: {
            label: radioParam.label,
          },
        }, radioParam.text);
      }));
    },
    render_input(h, param) {
      return h('Input', {
        props: {
          'type': param.inputType,
          'autosize': true,
          'value': param.value,
          'clearable': true,
        },
        on: {
          'on-change': (event) => {
            param.value = event.target.value;
          }
        }
      }, [])
    },
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
        }, ['提交']
      );
    },
    post() {
      this.buttonLoading = true;
      this.dealRequestParam();
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
    dealRequestParam() {
      let obj = Object.create(null);
      this.params.map((_param) => {
        obj[_param.key] = _param.value;
      });
      this.requestParam = obj;
    }
  },
  render(h) {
    return h('div', {}, [
      this.render_list(h),
      h('br'),
      this.render_submit(h),
    ]);
  }
}
