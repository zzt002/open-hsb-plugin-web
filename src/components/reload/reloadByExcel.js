import commonForm from '../../plugin/commonForm'
export default {
  name: 'reloadByExcel',
  components: {
    commonForm
  },
  data: () => ({
    params: [
      {title: 'Excel文件', type: 'File', key: 'file',value:'',help:{type:'link', text:'下载模板', url:'/thirdParty/esb/reloadExcel/template', fileName:'重载模板.xls'}},
      {title: 'VPN类型', type: 'Radio', key: 'vpnType',value: '2', params:[{label:'1', text:'VPN1'},{label:'2', text:'VPN2'}]},
      {title: '放入消息队列', type: 'Switch', key: 'backstage',value: 1, params:{open:'是', close:'否'}},
    ]
  }),
  render(h) {
    return h('commonForm',{
      props: {
        params: this.params,
        url: '/thirdParty/esb/reloadExcel',
        method: 'post',
        submitName: '重载',
      }
    },[
    ]);
  }
}
