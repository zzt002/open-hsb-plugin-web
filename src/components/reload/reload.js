import commonForm from '../../plugin/commonForm'
export default {
  name: 'reload',
  components: {
    commonForm
  },
  data: () => ({
    params: [
      {title: '服务信息', type: 'Input', key: 'service ',value: '', inputType:'textarea', placeholder:'服务名称/长编码(e.g.,33.1111.code.SynReq)'},
      {title: '放入消息队列', type: 'Switch', key: 'backstage',value: 1, params:{open:'是', close:'否'}},
    ]
  }),
  render(h) {
    return h('commonForm',{
      props: {
        params: this.params,
        url: '/api/thirdParty/reload/' + this.params[0].value,
        method: 'get',
        submitName: '重载',
      }
    },[
    ]);
  }
}
