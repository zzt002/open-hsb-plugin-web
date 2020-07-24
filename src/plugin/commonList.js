export default {
  name: 'commonList',
  props: {
    showPage: {
      type: Boolean,
      default: true,
    },
    url: {
      type: String,
      default: '',
      example: '/api/log/list',
    },
    changeColumns: {
      type: Array,
      default: () => [],
      example: () => [
        {key: 'operationStatus', value: {1: '成功', 0: '失败',}}
      ]
    },
    logColumns: {
      type: Array,
      default: () => [],
      example: () => [
        {title: 'ID', key: 'id', sortable: true, tooltip: true, width: '70px', align: 'center'},
        {show: false, title: '修改时间', key: 'modifyDate'},
        {
          title: '状态', key: 'operationStatus', render: (h, params) => {
            return h("span", [params.row.operationStatus === 1 ? h('span', {style: {color: '#00FF00'}}, '成功') : h('span', {style: {color: '#FF0000'}}, '失败')])
          },
          width: '70px', align: 'center'
        }
      ],
    },
  },
  data: () => ({
    detail: {},
    showDrawer: false,
    loading: true,
    resp_data: {
      code: {},
      message: {},
      data: {
        list: [],
      },
    },
    param: {
      type: Object,
      default: () => ({
        order: 1,
        pageNum: 1,
        pageSize: 10,
      })
    },
  }),
  methods: {
    list() {
      let _this = this;
      this.$axios.get(this.url, this.param,
        function (resp) {
          _this.resp_data = resp;
          _this.loading = false;
        },
      );
    },
    render_page(h) {
      if (!this.showPage) return;
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
            columns: this.logColumns,
            data: this.resp_data.data.list,
            border: '',
            loading: this.loading,
            'highlight-row': true
          },
          on: {
            'on-row-click': (object) => {
              let _this = this;
              this.showDrawer = true;
              this.detail = object;
              this.changeColumns.map((param) => {
                if (_this.detail[param.key] !== undefined) {
                  _this.detail[param.key] = param.value[_this.detail[param.key]];
                }
              })
            }
          }
        }, []);
    },
    render_detail(h) {
      return h('Drawer', {
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
          h('List', {}, this.logColumns.map((param) => {
            let key = param.key === undefined ? param.key1 : param.key;
            return h('ListItem', {}, [h('ListItemMeta', {
              props: {
                title: param.title,
                description: this.detail[key] === null ? '' : this.detail[key] + '',
              }
            }, [])]);
          }))
        ]
      );
    },
  },
  render(h) {
    return h('div', {}, [
      this.render_table(h),
      this.render_page(h),
      this.render_detail(h),
    ])
  },
  mounted() {
    this.list();
  }
}
