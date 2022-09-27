import Layout from '@/layout'

export default {
  path: '/task',
  name: 'task',
  component: Layout,
  meta: { title: '工单管理' },
  children: [
    {
      path: 'business',
      name: 'business',
      component: () => import('@/views/task/business/index.vue'),
      meta: { title: '运营工单' }
    },
    {
      path: 'operation',
      name: 'operation',
      component: () => import('@/views/task/operation/index.vue'),
      meta: { title: '运维工单' }
    }
  ]
}
