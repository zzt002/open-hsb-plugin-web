import commonButton from './commonButton'

export default {
  name: 'commonForm',
  components: {
    commonButton
  },
  data: () => ({
    buttonLoading: false,
    paramsMap: new Map(),
    requestParams: {},
    includeFile: false,
  }),
  props: {
    url: {
      type: String,
      default: '',
    },
    login: {
      type: Boolean,
      default: false,
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
      return h('div', {},
        this.params.map((param) => {
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
            )()
          ]);
        }
      ));
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
              this.delParamsMap(param.key);
              document.getElementById('fileName').innerText = initText;
              this.setParamsMap(param.key, event.target.files[0]);
              document.getElementById('fileName').innerText = event.target.files[0].name;
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
              this.setParamsMap(param.key, value ? 1 : 0);
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
              this.setParamsMap(param.key, _value);
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
      let clearable = param.clearable === undefined ? true : param.clearable;
      let password = param.password === undefined ? false : param.password;
      let _this = this;
      return h('Input', {
        props: {
          'type': param.inputType,
          'autosize': true,
          'value': param.value,
          'clearable': clearable,
          placeholder: param.placeholder,
          password: password,
        },
        on: {
          'on-change': (event) => {
            this.setParamsMap(param.key, event.target.value);
          }
        }
      }, [])
    },
    setParamsMap(key, value) {
      this.paramsMap.set(key, value);
      this.dealRequestParams();
    },
    delParamsMap(key) {
      this.paramsMap.delete(key);
      this.dealRequestParams();
    },
    render_submit(h) {
      this.initRequestParams;
      let _this = this;
      return h(
        'commonButton', {
          props: {
            url: _this.url,
            params: _this.requestParams,
            method: _this.method,
            submitName: _this.submitName,
            showConfirm: _this.showConfirm,
            confirmMessage: _this.confirmMessage,
            login: _this.login,
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
    initRequestParams() {
      this.params.map((param) => {
        if (param.key !== undefined) {
          this.paramsMap.set(param.key, param.value);
        }
      });
      this.dealRequestParams();
    },
    dealRequestParams() {
      let obj = Object.create(null);
      for(let [key,value] of this.paramsMap) {
        obj[key] = value;
      }
      this.requestParams = obj;
    }
  },
  render(h) {
    return h('div', {
      on:{
        'keydown':(e)=>{
          // 回车事件
          if (e.keyCode === 13) {
            document.getElementById('submitButton').click();
          }
        }
      }
    }, [
      this.render_list(h),
      h('br'),
      this.render_submit(h),
    ]);
  },
  mounted() {
    this.initRequestParams();
  }
}
