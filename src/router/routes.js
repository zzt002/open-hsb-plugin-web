import LAYOUT from '@/components/layout/layout'

export default [
  {
    path: '',
    name: 'LAYOUT',
    component: LAYOUT,
    children: [
      {
        path: '/reloadFailList',
        components: {
          home: () => import('../components/reloadFailList')
        }
      },
      {
        path: '/log',
        components: {
          home: () => import('../components/log')
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
          home: () => import('../components/registerInterface')
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
      }

    ]
  }
]
