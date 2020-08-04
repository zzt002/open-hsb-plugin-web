import commonList from '../../plugin/commonList'
import commonButton from '../../plugin/commonButton'
import commonListOperate from '../../plugin/commonListOperate'

export default {
  name: 'reloadFailList',
  components: {
    commonList, commonButton
  },
  props: ['dataList'],
  data: () => ({
    parList: [],
    logColumns:
      [
        {title: 'ID', key: 'id', tooltip: true, width: '70px', align: 'center'},
        {title: '创建时间', key: 'createTime', tooltip: true, width: '170px', align: 'center'},
        {title: '重载url', key: 'reloadUrl', tooltip: true, align: 'center'},
        {title: '重试次数', key: 'retryCount', tooltip: true, align: 'center'},
        {title: '错误信息', key: 'errorMessage', tooltip: true, align: 'center'},
        commonListOperate.produce({url:'/api/reload/fail/reload/',key:'id',text:'重载'}),
      ],
  }),
  methods: {
    refresh() {
      document.getElementById('refresh').click();
    }
  },
  render(h) {
    return h('div', {}, [
      h('commonButton', {
        style: {
          position: 'relative',
          bottom: '-23px',
          left: '-46%',
          display: this.parList === null || this.parList === undefined || this.parList.length === 0 ? 'none' : 'inline',
        },
        props: {
          url: '/api/reload/fail/reload/all',
          submitName: '一键重载',
          method: 'post',
        },
        on:{
          'consumeMethod':()=> {
            this.refresh();
          }
        }
      }, []),
      h('commonList', {
        props: {
          url: '/api/reload/fail/list',
          logColumns: this.logColumns,
          showPage: true,
          showDrawer: false,
        },
        on: {
          getRespList: (data) => {
            this.parList = data;
          }
        }
      })
    ]);
  },
}
