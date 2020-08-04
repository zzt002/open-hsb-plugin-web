import LAYOUT from '@/components/layout/layout'

function breadcrumb() {
  return '<BreadcrumbItem to="">Home</BreadcrumbItem>'
}

export default [
  {
    path: '',
    name: 'LAYOUT',
    component: LAYOUT,
    children: [
      {
        path: '/reloadFailList',
        components: {
          home: () => import('../components/reload/reloadFailList')
        }
      },
      {
        path: '/log',
        components: {
          home: () => import('../components/other/log'),
          breadcrumb: () => import('../components/other/log'),
        }
      },
      {
        path: '/openIp',
        components: {
          home: () => import('../components/openIp/openIp')
        }
      },
      {
        path: '/registerInterface',
        components: {
          home: () => import('../components/registerInterf/registerInterface')
        }
      },
      {
        path: '/openIpByExcel',
        components: {
          home: () => import('../components/openIp/openIpByExcel')
        }
      },
      {
        path: '/reloadByExcel',
        components: {
          home: () => import('../components/reload/reloadByExcel')
        }
      },
      {
        path: '/reload',
        components: {
          home: () => import('../components/reload/reload')
        }
      },
      {
        path: '/taskForOpenIp',
        components: {
          home: () => import('../components/task/taskForOpenIp')
        }
      },
      {
        path: '/rabbit',
        components: {
          home: () => import('../components/other/rabbit')
        }
      },
      {
        path: '/deleteInterf',
        components: {
          home: () => import('../components/registerInterf/deleteInterf')
        }
      },
      {
        path: '/unConfigList',
        components: {
          home: () => import('../components/resourcePass/unConfigList')
        }
      },
      {
        path: '/api',
        components: {
          home: () => import('../components/other/api')
        }
      }


    ]
  }
]
