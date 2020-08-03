import commonList from '../../plugin/commonList'
import commonButton from '../../plugin/commonButton'
import axios from '../../plugin/ajax'
import Vue from 'vue'

export default {
  name: 'taskForOpenIp',
  components: {
    commonList, commonButton
  },
  props: ['dataList'],
  data: () => ({
    test: 1,
    logColumns:
      [
        // {title: 'ID', key: 'id', tooltip: true, width: '70px', align: 'center'},
        {title: '名称', key: 'name', tooltip: true, width: '170px', align: 'center'},
        {title: '描述', key: 'description', tooltip: true, align: 'center'},
        {title: '项数天数', key: 'limit', tooltip: true, align: 'center'},
        {
          title: '状态', key: 'open', tooltip: true, align: 'center',render: (h, params) => {
            return h('i-switch', {
              props: {value: params.row.open === '1',},
              on: {
                'on-change': () => {
                  let url = '/api/taskConfig/change/' + params.row.id;
                  axios.post(url,null,function(resp){
                      params.row.open = resp.data;
                  });
                }
              }
            }, [
              h('span', {slot: 'open'}, '开'),
              h('span', {slot: 'close'}, '关'),
            ])
          }
        },
      ],
  }),

  render(h) {
    return h('div', {}, [
      h('commonList', {
        props: {
          url: '/api/taskConfig/list',
          logColumns: this.logColumns,
          showPage: true,
          showDrawer: false,
        },
      })
    ]);
  },
}
