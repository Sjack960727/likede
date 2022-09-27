import Layout from '@/layout'

export default {
  path: '/policy',
  name: 'policy',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/policy/index.vue'),
      meta: { title: '策略管理' }
    }
  ]
}
