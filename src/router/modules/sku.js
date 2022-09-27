import Layout from '@/layout'

export default {
  path: '/sku',
  name: 'sku',
  component: Layout,
  meta: { title: '商品管理' },
  children: [
    {
      path: 'sku-class',
      name: 'sku-class',
      component: () => import('@/views/sku/sku-class/index.vue'),
      meta: { title: '商品类型' }
    },
    {
      path: 'sku',
      name: 'sku/sku',
      component: () => import('@/views/sku/sku/index.vue'),
      meta: { title: '商品管理' }
    }
  ]
}
