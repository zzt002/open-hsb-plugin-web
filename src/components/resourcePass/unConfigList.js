import commonList from '../../plugin/commonList'
import commonButton from '../../plugin/commonButton'
import commonListOperate from '../../plugin/commonListOperate'

export default {
  name: 'unConfigList',
  components: {
    commonList, commonButton
  },
  props: ['dataList'],
  data: () => ({
    parList: [],
    unConfigType: 0,
    day: 3,
    listNum: 10,
    logColumns: [
      // {title: 'ID', key: 'id', tooltip: true, align: 'center', width: '100px',},
      {title: '工单号', key: 'implNum', tooltip: true, width: '200px', align: 'center'},
      // {title: '资源ID', key: 'resId', tooltip: true, align: 'center', width: '70px',},
      // {title: '资源类型', key: 'resourceType', tooltip: true, align: 'center', width: '70px',},
      // {title: '消费ID', key: 'customerId', tooltip: true, align: 'center', width: '70px',},
      {title: '配置信息', key: 'implRecord', tooltip: true, align: 'center'},
      // {title: '配置人ID', key: 'modifyUserId', tooltip: true, align: 'center', width: '70px',},
      // {title: '状态', key: 'sts', tooltip: true, align: 'center', width: '70px',},
      commonListOperate.produce({url:'/api/resourcePass/openIpByImplNum/',key:'implNum',text:'配置',width:'90px'}),
    ],
    numList: [
      {
        value: 10,
        label: '10条'
      },
      {
        value: 20,
        label: '20条'
      },
      {
        value: 30,
        label: '30条'
      },
      {
        value: 50,
        label: '50条'
      },
      {
        value: 100,
        label: '100条'
      },
    ]
  }),
  methods: {
    refresh() {
      this.$nextTick(function(){document.getElementById('refresh').click();});
    },
    render_changeUnconfig(h) {
      return h('div',
        {
          style:{
            position: 'relative',
            bottom: '-18px',
            width: '92%',
          }
        },
        [
          h('commonButton', {
            style: {
              position: 'relative',
              left: '-30%',
              display: 'inline',
            },
            props: {
              url: '/api/resourcePass/openIpAuto' + this.day,
              submitName: '自动配置',
              method: 'post',
            },
            on:{
              'consumeMethod':()=> {
                this.refresh();
              }
            }
          }, []),
          h('Input',{style:{width:'36px',position:'relative',left:'-30%'},props:{value: this.day},on:{'on-change':(event)=>{this.day = event.target.value;}}}),
          h('span',{style:{'font-size':'16px','font-weight':'bold',position:'relative',left:'-30%'}},'天'),
          h('span',{style:{'font-size':'16px','font-weight':'bold',position:'relative',left:'30%'}},['显示: ',]),
          h('Select', {
            props:{value: this.listNum},
            style:{width:'100px',position:'relative',left:'30%'},
            on:{
              'on-change':(item) => {
                this.listNum = item;
                this.refresh();
              }
            }
            },this.numList.map((item) => {
              return h('Option',{props:{label:item.label,value:item.value}})
            })
          ),
          h('span',{style:{'font-size':'16px','font-weight':'bold',position:'relative',left:'30%'}},'筛选`未添加消费者`:'),
          h('i-switch', {
              props: {
                value: this.unConfigType === 1,
              },
              style:{
                position:'relative',
                left:'30%'
              },
              on: {
                'on-change': (value) => {
                  this.unConfigType = (value ? 1 : 0);
                  this.refresh();
                }
              }
            }, [
              h('span', {slot: 'open'}, '开'),
              h('span', {slot: 'close'}, '关'),
            ]
          ),
        ]
      );
    }
  },
  render(h) {
    return h('div', {}, [
      this.render_changeUnconfig(h),
      h('commonList', {
        props: {
          url: '/api/resourcePass/listOfUnset' + this.listNum + '?type=' + this.unConfigType,
          logColumns: this.logColumns,
          showPage: false,
          showDrawer: false,
          listType: 2,
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