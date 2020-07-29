import commonForm from '../../plugin/commonForm'
export default {
  name: 'openIpByExcel',
  components: {
    commonForm
  },
  data: () => ({
    params: [
      {title: 'Excel文件', type: 'File', key: 'file',value:''},
      {title: '开启权限', type: 'Switch', key: 'status',value: 1, params:{open:'开', close:'关'}},
    ]
  }),
  render(h) {
    return h('commonForm',{
      props: {
        params: this.params,
        url: '/api/esbServiceConsumer/openIp/excel',
        method: 'post',
      }
    },[
    ]);
  }
}
