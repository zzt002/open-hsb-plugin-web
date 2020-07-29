import commonForm from '../../plugin/commonForm'
export default {
  name: 'reloadByExcel',
  components: {
    commonForm
  },
  data: () => ({
    params: [
      {title: 'Excel文件', type: 'File', key: 'file',value:''},
      {title: 'VPN类型', type: 'Radio', key: 'vpnType',value: 2, params:[{label:'1', text:'VPN1'},{label:'2', text:'VPN2'}]},
      {title: '放入消息队列', type: 'Switch', key: 'backstage',value: 1, params:{open:'是', close:'否'}},
    ]
  }),
  render(h) {
    return h('commonForm',{
      props: {
        params: this.params,
        url: '/api/thirdParty/esb/reloadExcel',
        method: 'post',
      }
    },[
    ]);
  }
}
