import renderList from '../plugin/renderList'
export default {
  name: 'openIp',
  components: {
    renderList
  },
  data: () => ({
    params: [
      {title: '服务信息', type: 'Input', key: 'serviceStr',value:'', inputType: 'textarea'},
      {title: 'IP信息', type: 'Input', key: 'ipStr',value:'', inputType: 'textarea'},
      {title: '开启权限', type: 'Switch', key: 'status',value: '1', params:[{slot:'1', text:'开'}, {slot:'0', text:'关'}]},
    ]
  }),
  render(h) {
    return h('renderList',{
      props: {
        params: this.params,
        url: '/api/esbServiceConsumer/openIp',
      }
    },[
    ]);
  }
}
