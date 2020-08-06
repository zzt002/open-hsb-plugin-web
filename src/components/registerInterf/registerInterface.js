import commonForm from '../../plugin/commonForm'
export default {
  name: 'openIp',
  data: () => ({
    params: [
      {title: '服务编码短',key: 'atomCode',value: '',type: 'Input'},
      {title: '服务编码长',key: 'servcode',value: '',type: 'Input'},
      {title: 'esb_service_tree的id',key: 'belongId',value: '',type: 'Input'},
      {title: 'ip白名单',key: 'ipStr',value: '',type: 'Input'},
      {title: '原始请求地址',key: 'portAddr',value: '',type: 'Input'},
      {title: '服务名称',key: 'portName',value: '',type: 'Input'},
      {title: 'VPN环境',key: 'vpnType',value: '2',type:'Radio', params: [{label:'1',text:'VPN1'},{label:'2',text:'VPN2'}]},
      {title: 'http请求',key: 'httpType',value: '2',type:'Radio', params: [{label:'1',text:'GET'},{label:'2',text:'POST'}]},
      {title: '类型（e.g.,省 市）',key: 'portType',value: '市',type:'Radio', params: [{label:'省',text:'省接口'},{label:'市',text:'市接口'}]},
      {title: '是否存日志',key: 'saveLog',value: 1, type: 'Switch', params: {open:'是', 'close': '否'}},
    ],
  }),
  components: {
    commonForm
  },
  methods: {
    render_list(h) {
      return h("commonForm",{
        props: {
          url: '/register/publishUnConfig',
          params: this.params,
          submitName: '注册',
          method: 'post',
        }
      },[])
    },
  },
  render(h) {
    return h('div',{},[
      this.render_list(h),
    ]);
  }
}
