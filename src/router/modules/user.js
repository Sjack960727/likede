import Layout from '@/layout'

export default {
  path: '/user',
  name: 'user',
  component: Layout,
  meta: { title: '人员管理' },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/user/index/index.vue'),
      meta: { title: '人员列表' }
    },
    {
      path: 'user-task-stats',
      name: 'user-task-stats',
      component: () => import('@/views/user/user-task-stats/index.vue'),
      meta: { title: '人效统计' }
    },
    {
      path: 'user-work',
      name: 'user-work',
      component: () => import('@/views/user/user-work/index.vue'),
      meta: { title: '工作量列表' }
    }
  ]
}
