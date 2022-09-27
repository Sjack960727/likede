import Layout from '@/layout'

export default {
  path: '/report',
  name: 'report',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/report/index.vue'),
      meta: { title: '对账统计' }
    }
  ]
}
