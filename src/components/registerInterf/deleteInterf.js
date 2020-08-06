import commonForm from '../../plugin/commonForm'
export default {
  name: 'deleteInterf',
  components: {
    commonForm
  },
  data: () => ({
    params: [
      {title: '服务短编码', type: 'Input', key: 'atomCode',value:'', inputType: 'text'},
      {title: 'vpn环境选择', type: 'Radio', key: 'vpnType',value: 2, params:[{label:1, text:'VPN1'},{label:2,text:'VPN2'}]},
    ]
  }),
  render(h) {
    return h('commonForm',{
      props: {
        params: this.params,
        url: '/register/del',
        method: 'delete',
        submitName: '删除',
        showConfirm: true,
        confirmMessage: '是否删除该接口？',
      }
    },[
    ]);
  }
}
