import commonForm from '../../plugin/commonForm'
export default {
  name: 'healthCodeExcel',
  components: {
    commonForm
  },
  data: () => ({
    params: [
      {title: 'Excel文件', type: 'File', key: 'file',value:'',help:{type:'link', text:'下载模板', url:'/thirdParty/healthCodeExcel/template', fileName:'健康码导入模板.xlsx'}},
    ]
  }),
  render(h) {
    return h('commonForm',{
      props: {
        params: this.params,
        url: '/thirdParty/healthCodeListExcel',
        method: 'post',
        submitName: '导入',
        download: true,
        fileName: '健康码数据处理.xlsx',
      }
    },[
    ]);
  }
}
