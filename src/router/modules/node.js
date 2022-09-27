import Layout from '@/layout'

export default {
  path: '/node',
  name: 'node',
  component: Layout,
  meta: { title: '点位管理' },
  children: [
    {
      path: 'region',
      name: 'region',
      component: () => import('@/views/node/region/index.vue'),
      meta: { title: '区域管理' }
    },
    {
      path: 'node',
      name: 'node',
      component: () => import('@/views/node/node/index.vue'),
      meta: { title: '点位管理' }
    },
    {
      path: 'parnter',
      name: 'parnter',
      component: () => import('@/views/node/partner/index.vue'),
      meta: { title: '合作商管理' }
    }
  ]
}
