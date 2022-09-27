import Layout from '@/layout'

export default {
  path: '/order',
  name: 'order',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/order/index.vue'),
      meta: { title: '订单管理' }
    }
  ]
}
