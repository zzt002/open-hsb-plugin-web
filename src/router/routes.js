import LAYOUT from '@/components/layout/layout'

export default [
  {
    path: '',
    name: 'LAYOUT',
    component: LAYOUT,
    children: [
      {
        path: '/',
        components: {
          home: () => import('../components/HOME')
        }
      }
    ]
  }
]
