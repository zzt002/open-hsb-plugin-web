import commonList from '../../plugin/commonList'
export default {
  name: 'LOG',
  components:{
    commonList
  },
  data: () => ({
    logColumns:
    [
      {title: 'ID', key: 'id', tooltip: true, width: '70px', align: 'center'},
      {title: '创建时间', key: 'createDate', tooltip: true, width: '170px', align: 'center'},
      {title: '修改时间', key1: 'modifyDate', maxWidth: 0},
      {title: '标题', key: 'title',tooltip: true, width: '130px', align: 'center',},
      {title: '动作', key: 'action',tooltip: true, width: '120px', align: 'center',},
      {title: 'IP', key: 'ip', tooltip: true, width: '160px', align: 'center'},
      {title: '请求地址', key: 'url', tooltip: true, align: 'center'},
      {title: '请求参数', key: 'param', tooltip: true, align: 'center'},
      {title: '错误信息', key: 'message', tooltip: true, align: 'center'},
      {title: '状态', key: 'operationStatus',render: (h,params) => {
          return params.row.operationStatus === 1 ? h('span',{style:{color:'#00FF00'}},'成功') : h('span',{style:{color:'#FF0000'}},'失败')},
        width: '70px', align: 'center'}
    ],
    changeColumns: [
      {key: 'operationStatus', value:{1:'成功', 0:'失败',}}
    ]
  }),
  render(h) {
    return h('commonList',{
      props: {
        url: '/log/list',
        logColumns: this.logColumns,
        showPage: true,
        changeColumns: this.changeColumns,
      }
    });
  },
}
