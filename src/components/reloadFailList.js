import commonList from '../plugin/commonList'
import commonButton from '../plugin/commonButton'

export default {
  name: 'LOG',
  components: {
    commonList,commonButton
  },
  data: () => ({
    parList:[],
    logColumns:
      [
        {title: 'ID', key: 'id', tooltip: true, width: '70px', align: 'center'},
        {title: '创建时间', key: 'createTime', tooltip: true, width: '170px', align: 'center'},
        {title: '重载url', key: 'reloadUrl', tooltip: true},
        {title: '重试次数', key: 'retryCount', tooltip: true},
        {title: '错误信息', key: 'errorMessage', tooltip: true},
      ],
  }),
  render(h) {
    return h('div', {}, [
      h('commonButton',{
        style:{
          position: 'relative',
          bottom:'-23px',
          left:'-44%',
          display: this.parList === null || this.parList === undefined || this.parList.length === 0? 'none': 'inline',
        },
        props: {
          url: '/api/reload/fail/reload/all',
          submitName: '一键重载',
        }
      },[]),
      h('commonList', {
        props: {
          url: '/api/reload/fail/list',
          logColumns: this.logColumns,
          showPage: true,
        },
      })
    ]);
  },
  mounted() {
    this.$emit('getRespList', function (value) {
      this.parList = value;
      console.log(value);
    });
    console.log(this.parList);
  }
}
