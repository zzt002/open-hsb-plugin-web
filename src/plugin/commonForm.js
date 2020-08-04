import commonButton from './commonButton'

export default {
  name: 'commonForm',
  components: {
    commonButton
  },
  data: () => ({
    buttonLoading: false,
    requestParams: {},
    includeFile: false,
  }),
  props: {
    url: {
      type: String,
      default: '',
    },
    method: {
      type: String,
      default: 'get',
    },
    submitName: {
      type: String,
      default: '提交',
    },
    confirmMessage: {
      type: String,
      default: 'Are you sure?',
    },
    showConfirm: {
      type: Boolean,
      default: false,
    },
    params: {
      type: Array,
      default: () => [],
      example: () => [
        {title: 'title', type: 'Input', key: 'key1', value: 'value', inputType: 'text',placeholder:''},
        {
          title: 'title',
          type: 'Radio',
          key: 'key2',
          value: '1',
          params: [{label: '1', text: '是'}, {label: '0', text: '否'}]
        },
        {title: 'title', type: 'Switch', key: 'key3', value: 'true', params: {open: '是', close: '否'}},
      ],
    },
  },
  methods: {
    render_list(h) {
      let _this = this;
      return h('div', {}, this.params.map((param) => {
          return h('div', {}, [
            h('h3', {}, param.title),
            (
              function () {
                if (param.type === undefined) {
                  return null;
                } else if (param.type === 'Input') {
                  return _this.render_input(h, param);
                } else if (param.type === 'Select') {
                  return _this.render_select(h, param);
                } else if (param.type === 'Switch') {
                  return _this.render_switch(h, param);
                } else if (param.type === 'Radio') {
                  return _this.render_radio(h, param)
                } else if (param.type === 'File') {
                  _this.includeFile = true;
                  return _this.render_file(h, param)
                } else {
                  return null;
                }
              }
            )()]);
        })
      );
    },
    render_file(h, param) {
      return h('div', {}, [
        this.render_choose_file(h, param),
        this.render_choose_file_help(h, param),
      ])

    },
    render_choose_file_help(h, param) {
      let _this = this;
      return h(
        'Poptip',
        {
          props: {
            trigger: 'hover',
            // content: param.help,
            placement: 'bottom-consume',
            padding: '0'
          },
          on: {
            'on-popper-show': () => {
              document.getElementById('help').setAttribute('class', 'ivu-icon ivu-icon-ios-help-circle')
            },
            'on-popper-hide': () => {
              document.getElementById('help').setAttribute('class', 'ivu-icon ivu-icon-ios-help-circle-outline')
            },
          },
        },
        [
          h('i', {
            attrs: {class: 'ivu-icon ivu-icon-ios-help-circle-outline', id: 'help'},
            style: {cursor: 'help', position: 'relative', top: '-8px', left: '3px'}
          }),
          h('div',
            {
              slot: 'content',
            },[
            (function() {
              if (param.help.type === 'link') {
                return h('a', {href:'#',on:{
                  click: () => {
                    _this.$axios.download(param.help.url, param.help.fileName);
                  }
                  }}, param.help.text);
              } else if (param.help.type === 'text') {
                return h('span', {}, param.help.text);
              }
            })()]
          )
        ]
      );
    },
    render_choose_file(h, param) {
      let initText = '选择文件';
      return h('Button', {
        props: {icon: 'ios-cloud-upload-outline',},
        on: {
          click: () => {
            document.getElementById("selectFile").click();
          }
        }
      }, [
        h('input', {
          attrs: {id: 'selectFile', type: 'file'},
          style: {opacity: 0, position: 'relative', left: '-35px', 'z-index': -1, width: '2px'},
          on: {
            'change': (event) => {
              param.value = '';
              document.getElementById('fileName').innerText = initText;
              param.value = event.target.files[0];
              document.getElementById('fileName').innerText = param.value.name;
            }
          }
        }),
        h('span', {attrs: {id: 'fileName'},}, initText),
      ]);
    },
    render_switch(h, param) {
      let _this = this;
      return h('i-switch', {
          props: {
            value: param.value === 1,
          },
          on: {
            'on-change': (value) => {
              _this.$nextTick(function () {
                param.value = (value ? 1 : 0);
              });
            }
          }
        }, [
          h('span', {slot: 'open'}, param.params.open),
          h('span', {slot: 'close'}, param.params.close),
        ]
      );
    },
    render_select(h, param) {
      return h('Select', {}, []);
    },
    render_radio(h, param) {
      let _this = this;
      return h('RadioGroup', {
          props: {
            value: param.value,
          },
          on: {
            'on-change': (_value) => {
              _this.$nextTick(function () {
                param.value = _value;
              })
            }
          }
        },
        param.params.map((radioParam) => {
          return h('Radio', {
            props: {
              label: radioParam.label,
              value: param.value === radioParam.label
            },
          }, radioParam.text);
        })
      );
    },
    render_input(h, param) {
      let _this = this;
      return h('Input', {
        props: {
          'type': param.inputType,
          'autosize': true,
          'value': param.value,
          'clearable': true,
          placeholder: param.placeholder,
        },
        on: {
          'on-change': (event) => {
            _this.$nextTick(function () {
              param.value = event.target.value;
            })
          }
        }
      }, [])
    },
    render_submit(h) {
      let _this = this;
      this.dealRequestParam();
      // console.log('参数处理后:' + JSON.stringify(this.requestParams));
      return h(
        'commonButton', {
          props: {
            url: _this.url,
            params: _this.requestParams,
            method: _this.method,
            submitName: _this.submitName,
            showConfirm: _this.showConfirm,
            confirmMessage: _this.confirmMessage,
          },
          on: {
            'afterSuccess': () => {
              if (_this.includeFile) {
                this.initSelectFile();
              }
            }
          }
        }, []
      );
    },
    initSelectFile() {
      document.getElementById('selectFile').value = '';
      document.getElementById('fileName').innerText = '选择文件';
    },
    dealRequestParam() {
      let obj = Object.create(null);
      this.params.map((_param) => {
        obj[_param.key] = _param.value;
      });
      this.requestParams = obj;
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
