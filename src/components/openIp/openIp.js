import commonForm from '../../plugin/commonForm'
export default {
  name: 'openIp',
  components: {
    commonForm
  },
  data: () => ({
    params: [
      {title: '服务信息', type: 'Input', key: 'serviceStr',value:'', inputType: 'textarea'},
      {title: 'IP信息', type: 'Input', key: 'ipStr',value:'', inputType: 'textarea'},
      {title: '开启权限', type: 'Switch', key: 'status',value: 1, params:{open:'开', close:'关'}},
    ]
  }),
  render(h) {
    return h('commonForm',{
      props: {
        params: this.params,
        url: '/api/esbServiceConsumer/openIp',
        method: 'post',
      }
    },[
    ]);
  }
}
