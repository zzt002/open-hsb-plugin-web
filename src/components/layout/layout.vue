<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu :active-name="activeName" theme="light" width="auto" :open-names="['1']" v-for="(sub) in menu">
            <Submenu :name="sub.submenu" v-if="sub.submenu !== undefined">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                <b>{{sub.text}}</b>
              </template>
              <template v-for="(item) in sub.menuItem">
                <MenuItem :name="item.name" :to="item.to"><span @click="changeBreadcurmb(sub,item)">{{item.text}}</span></MenuItem>
              </template>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>{{breadcurmb.first}}</BreadcrumbItem>
            <BreadcrumbItem>{{breadcurmb.second}}</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '728px', background: '#fff'}">
            <router-view name="home"></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  export default {
    data: () => ({
      activeName: '',
      breadcurmb:{
        first: '',
        second: ''
      },
      menu:[
        {submenu: '1',text:'工单',menuItem:[
            {name: '1-1',to:'/unConfigList',text:'未配置列表'},
          ]
        },
        {submenu: '2',text:'IP权限',menuItem:[
            {name: '2-1',to:'/openIp',text:'手动开启权限'},
            {name: '2-2',to:'/openIpByExcel',text:'EXCEL权限'},
          ]
        },
        {submenu: '3',text:'重载',menuItem:[
            {name: '3-1',to:'/reloadFailList',text:'重载失败列表'},
            {name: '3-2',to:'/reload',text:'重载'},
            {name: '3-3',to:'/reloadByExcel',text:'EXCEL重载'},
          ]
        },
        {submenu: '4',text:'接口注册',menuItem:[
            {name: '4-1',to:'/registerInterface',text:'接口注册'},
            {name: '4-2',to:'/deleteInterf',text:'接口删除'},
          ]
        },
        {submenu: '5',text:'服务本机',menuItem:[
            {name: '5-1',to:'/log',text:'系统日志'},
            {name: '5-2',to:'/taskForOpenIp',text:'定时任务'},
            {name: '5-3',to:'/rabbit',text:'RabbitMq'},
            {name: '5-4',to:'/api',text:'API'},
          ]
        },

      ],
    }),
    methods: {
      changeBreadcurmb(sub, item) {
        this.activeName = item.name;
        this.breadcurmb.first = sub.text;
        this.breadcurmb.second = item.text;
      }
    },
    mounted() {
      this.activeName = this.menu[0].menuItem[0].name;
      this.breadcurmb ={
        first: this.menu[0].text,
        second: this.menu[0].menuItem[0].text
      };
    }
  }
</script>
