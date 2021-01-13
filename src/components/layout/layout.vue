<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 300px;
    height: 50px;
    background: #FFFFFF;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    left: 20px;
    padding: 0px 5px;
    font-size: 28px;
  }
  .layout-nav{
    width: 200px;
    margin: 0 auto;
    margin-right: 0px;
  }
  .layout-exit{
    position: fixed;
    right: 30px;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">HSB PLUGIN</div>
          <div class="layout-nav">
            <MenuItem name="1">
              <div @click="copy()">
              <Icon type="ios-contact" size="20"></Icon>
                {{username}}
              </div>
            </MenuItem>
          </div>
          <div class="layout-exit">
            <MenuItem name="2">
              <Icon type="md-exit" size="20" @click="exit()"></Icon>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu :active-name="layoutInfo.active" theme="light" width="auto" :open-names="[]" v-for="(sub,index) in menu" :key="index">
            <Submenu :name="sub.submenu" v-if="sub.submenu !== undefined" >
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
               <b :id="'menu' + sub.submenu">{{sub.text}}</b>
              </template>
              <div style="padding:0" v-for="(item,index) in sub.menuItem" :key="index">
                <MenuItem :name="item.name" :to="{name:item.to,params:{activeName:sub.submenu,first:sub.text,second:item.text}}"
                             @click.native="changeBreadcurmb(sub,item)">
                  <Badge :count="failCount" v-if="item.to === 'reloadFailList'">{{item.text}}</Badge>
                  <span v-else>{{item.text}}</span>
                </MenuItem>
              </div>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>{{this.layoutInfo.first}}</BreadcrumbItem>
            <BreadcrumbItem>{{this.layoutInfo.second}}</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '700px', background: '#fff'}">
            <router-view name="home"></router-view>
          </Content>
        </Layout>
      </Layout>
      <Footer class="layout-footer-center">Copyright &copy; 2019-2020</Footer>
    </Layout>
  </div>
</template>
<script>
  import reloadFailList from '../reload/reloadFailList'
  import {isLogin,logout} from '../../plugin/storage'
  import {copy} from '../../plugin/documentCopy'
  export default {
    data: () => ({
      username: localStorage.getItem('name') === '' ? '无名' : localStorage.getItem('name'),
      failCount: 0,
      layoutInfo: {
        openName: '',
        active: "",
        first: "",
        second: "",
      },
      menu:[
        {submenu: '1',text:'工单',menuItem:[
            {name: '1-1',to:'unConfigList',text:'未配置列表'},
          ]
        },
        {submenu: '2',text:'IP权限',menuItem:[
            {name: '2-1',to:'openIp',text:'手动开启权限'},
            {name: '2-2',to:'openIpByExcel',text:'EXCEL权限'},
          ]
        },
        {submenu: '3',text:'重载',menuItem:[
            {name: '3-1',to:'reloadFailList',text:'重载失败列表'},
            {name: '3-2',to:'reload',text:'重载'},
            {name: '3-3',to:'reloadByExcel',text:'EXCEL重载'},
          ]
        },
        {submenu: '4',text:'接口注册',menuItem:[
            {name: '4-1',to:'registerInterface',text:'接口注册'},
            {name: '4-2',to:'deleteInterf',text:'接口删除'},
          ]
        },
        {submenu: '5',text:'服务本机',menuItem:[
            {name: '5-1',to:'log',text:'系统日志'},
            {name: '5-2',to:'taskForOpenIp',text:'定时任务'},
            {name: '5-3',to:'rabbit',text:'RabbitMq'},
            {name: '5-4',to:'api',text:'API'},
            {name: '5-5',to:'healthCode',text:'浙江省健康码数据'},
          ]
        }
      ],
    }),
    methods: {
      changeBreadcurmb(sub, item) {
        this.layoutInfo.openName = sub.submenu;
        this.layoutInfo.active = item.name;
        this.layoutInfo.first = sub.text;
        this.layoutInfo.second = item.text;
        this.$store.commit('setLayoutInfo', this.layoutInfo);
      },
      loginTimer() {
          setInterval(this.checkLogin, 1000)
      },
      exit() {
        logout();
      },
      copy() {
        copy(localStorage.getItem('token'));
        this.$Message.info("Token已复制到剪切板")
      },
      checkLogin() {
        if (!isLogin()) {
          this.$router.push('/login');
        }
      }
    },
    created() {
      this.checkLogin();
    },
    mounted() {
      this.loginTimer();

      let layoutInfo = sessionStorage.getItem('layoutInfo');
      if (layoutInfo === null || layoutInfo === undefined) {
        // this.layoutInfo.openName = this.menu[0].submenu;
        // this.layoutInfo.active = this.menu[0].menuItem[0].name;
        // this.layoutInfo.first =  this.menu[0].text;
        // this.layoutInfo.second = this.menu[0].menuItem[0].text;
        // this.$router.push(this.menu[0].menuItem[0].to);
      } else {
        this.layoutInfo = JSON.parse(layoutInfo);
        document.getElementById('menu' + this.layoutInfo.openName).click();
      }
    },
  }
</script>
