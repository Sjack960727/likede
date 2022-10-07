import Layout from '@/layout'

export default {
  path: '/vm',
  name: 'vm',
  component: Layout,
  meta: { title: '设备管理' },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/vm/index'),
      meta: { title: '设备管理' }
    },
    {
      path: 'status',
      name: 'status',
      component: () => import('@/views/vm/status/index.vue'),
      meta: { title: '设备状态' }
    },
    {
      path: 'type',
      name: 'type',
      component: () => import('@/views/vm/type/index.vue'),
      meta: { title: '设备类型管理' }
    }
  ]
}
