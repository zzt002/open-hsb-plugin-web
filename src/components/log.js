export default {
  name: 'LOG',
  data: () => ({
    detail: {},
    showDrawer: false,
    loading: true,
    param: {
      order: 1,
      pageNum: 1,
      pageSize: 10,
    },
    resp_data: {
      code:{},
      message:{},
      data:{
        list:[],
      },
    },
    log_columns: [
      {title: 'ID', key: 'id', sortable: true, tooltip: true, width: '70px', align: 'center'},
      {title: '创建时间', key: 'createDate', tooltip: true, width: '170px', align: 'center'},
      {title: '动作', key: 'title', tooltip: true, width: '130px', align: 'center',},
      {title: 'IP', key: 'ip', tooltip: true, width: '120px', align: 'center'},
      {title: '请求地址', key: 'url', tooltip: true, align: 'center'},
      {title: '请求参数', key: 'param', tooltip: true, align: 'center'},
      {title: '错误信息', key: 'message', tooltip: true, align: 'center'},
      {title: '状态', key: 'operationStatus',render: (h,params) => {
        return h("span", [params.row.status === 1 ? h('span',{style:{color:'#00FF00'}},'成功') : h('span',{style:{color:'#FF0000'}},'失败')])},
        width: '70px', align: 'center'}
    ],
  }),
  methods: {
    list() {
      this.$axios({
        url: '/api/log/list',
        params: this.param,
        method: 'get',
      }).then( resp => {
         this.resp_data = resp.data;
         this.loading = false;
      }).catch( ex => {
        console.error(ex);
      })
    },
    render_page(h) {
      return h(
        'Page',
        {
          props: {
            total: this.resp_data.data.total,
            'show-total': true,
            'show-sizer': true,
            'show-elevator': true,
            current: this.param.pageNum,
            'page-size': this.param.pageSize,
          },
          on: {
            'on-change': (pageNum) => {
              this.param.pageNum = pageNum;
              this.list();
            },
            'on-page-size-change': (pageSize) => {
              this.param.pageSize = pageSize;
              this.list();
            }
          }
        },
        [],
      )
    },
    render_table(h) {
      return h('Table',
        {
          props: {
            columns: this.log_columns,
            data: this.resp_data.data.list,
            border: '',
            loading: this.loading,
            'highlight-row': true
          },
          on: {
            'on-row-click': (object) => {
              this.showDrawer = true;
              this.detail = object;
            }
          }
        }, []);
    },
    render_detail(h) {
      return h('Drawer',{
          props: {
            value: this.showDrawer,
            width: '640',
          },
          on: {
            'on-close': () => {
              this.showDrawer = false;
            }
          }
        },
        [
          h('List',{},[
            h('ListItem',{},[h('ListItemMeta', {props: {title: 'ID', description: this.detail.id}},[])]),
            h('ListItem',{},[h('ListItemMeta', {props: {title: '创建时间', description: this.detail.createDate}},[])]),
            h('ListItem',{},[h('ListItemMeta', {props: {title: '修改时间', description: this.detail.modifyDate}},[])]),
            h('ListItem',{},[h('ListItemMeta', {props: {title: '标题', description: this.detail.title}},[])]),
            h('ListItem',{},[h('ListItemMeta', {props: {title: '操作', description: this.detail.action}},[])]),
            h('ListItem',{},[h('ListItemMeta', {props: {title: 'IP', description: this.detail.ip}},[])]),
            h('ListItem',{},[h('ListItemMeta', {props: {title: 'URL', description: this.detail.url}},[])]),
            h('ListItem',{},[h('ListItemMeta', {props: {title: '参数', description: this.detail.param}},[])]),
            h('ListItem',{},[h('ListItemMeta', {props: {title: '操作状态', description: this.detail.operationStatus === 1? '成功':'失败'}},[])]),
            h('ListItem',{},[h('ListItemMeta', {props: {title: '错误信息', description: this.detail.message}},[])]),
          ]),
        ]
      );
    },
  },
  render(h) {
    return h('div',{},[
      this.render_table(h),
      this.render_page(h),
      this.render_detail(h),
    ])
  },
  mounted() {
    this.list();
  }
}
