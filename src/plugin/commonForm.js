import commonButton from './commonButton'
export default {
  name: 'commonForm',
  components: {
    commonButton
  },
  data: () => ({
    buttonLoading: false,
    requestParam: {},
  }),
  props: {
    url: {
      type: String,
      default:'',
    },
    method: {
      type: String,
      default: 'get',
    },
    params: {
      type: Array,
      default: () => [],
      example: () => [
        {title: 'title', type: 'Input', key: 'key1', value: 'value', inputType:'text'},
        {title: 'title', type: 'Radio', key: 'key2', value: '1', params: [{label: '1', text: '是'}, {label: '0', text: '否'}]},
        {title: 'title', type: 'Switch', key: 'key3', value: 'true', params:{open: '是', close: '否'}},
      ],
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
            value: param.value === 1,
          },
          on: {
            'on-change': (value) => {
              param.value = value ? 1 : 0;
            }
          }
        },[
          h('span', {slot:'open'},param.params.open),
          h('span', {slot:'close'},param.params.close),
        ]
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
      this.dealRequestParam();
      return h(
        'commonButton', {
          props: {
            url: this.url,
            params: this.params,
          },
        }, []
      );
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
