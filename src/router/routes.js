import LAYOUT from '@/components/layout/layout'
import LOGIN from '@/components/login/login'

export default [
  {
    path: '/login',
    name: 'LOGIN',
    component: LOGIN,
  },
  {
    path: '/',
    name: 'LAYOUT',
    component: LAYOUT,
    children: [
      {
        path: '/reloadFailList',
        name:'reloadFailList',
        components: {
          home: () => import('../components/reload/reloadFailList')
        }
      },
      {
        path: '/log',
        name: 'log',
        components: {
          home: () => import('../components/other/log'),
        }
      },
      {
        path: '/openIp',
        name:'openIp',
        components: {
          home: () => import('../components/openIp/openIp')
        }
      },
      {
        path: '/registerInterface',
        name:'registerInterface',
        components: {
          home: () => import('../components/registerInterf/registerInterface')
        }
      },
      {
        path: '/openIpByExcel',
        name:'openIpByExcel',
        components: {
          home: () => import('../components/openIp/openIpByExcel')
        }
      },
      {
        path: '/reloadByExcel',
        name:'reloadByExcel',
        components: {
          home: () => import('../components/reload/reloadByExcel')
        }
      },
      {
        path: '/reload',
        name:'reload',
        components: {
          home: () => import('../components/reload/reload')
        }
      },
      {
        path: '/taskForOpenIp',
        name: 'taskForOpenIp',
        components: {
          home: () => import('../components/task/taskForOpenIp')
        }
      },
      {
        path: '/rabbit',
        name:'rabbit',
        components: {
          home: () => import('../components/other/rabbit')
        }
      },
      {
        path: '/deleteInterf',
        name:'deleteInterf',
        components: {
          home: () => import('../components/registerInterf/deleteInterf')
        }
      },
      {
        path: '/unConfigList',
        name:'unConfigList',
        components: {
          home: () => import('../components/resourcePass/unConfigList')
        }
      },
      {
        path: '/api',
        name:'api',
        components: {
          home: () => import('../components/other/api')
        }
      },
      {
        path: '/healthCode',
        name:'healthCode',
        components: {
          home: () => import('../components/other/healthCode')
        }
      }

    ]
  }
]
