import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '@/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      order: -1,
      icon: 'lucide:layout-dashboard',
      title: '供应链管理',
    },
    name: '供应链管理',
    path: '/supply-chain',
    children: [
      {
        path: 'supplier',
        component: () => import('@/views/supply-chain/chain-supplier.vue'),
        name: '供应商管理',
        meta: {
          breadcrumb: '供应商管理',
          title: '供应商管理',
        },
      },
      {
        path: 'brand',
        component: () => import('@/views/supply-chain/chain-brand.vue'),
        name: '品牌管理',
        meta: {
          breadcrumb: '品牌管理',
          title: '品牌管理',
        },
      },
      {
        path: 'category',
        component: () => import('@/views/supply-chain/chain-category.vue'),
        name: '分类管理',
        meta: {
          breadcrumb: '分类管理',
          title: '分类管理',
        },
      },
      {
        path: 'spuAudit',
        component: () => import('@/views/supply-chain/chain-spu-audit.vue'),
        name: 'SPU审核',
        meta: {
          breadcrumb: 'SPU审核',
          title: 'SPU审核',
        },
      },
      {
        path: 'spuList',
        component: () => import('@/views/supply-chain/chain-spu-list.vue'),
        name: 'SPU列表',
        meta: {
          breadcrumb: 'SPU列表',
          title: 'SPU列表',
        },
      },
      {
        path: 'skuList',
        component: () => import('@/views/supply-chain/chain-sku-list.vue'),
        name: 'SKU列表',
        meta: {
          breadcrumb: 'SKU列表',
          title: 'SKU列表',
        },
      },
      {
        path: 'skuAudit',
        component: () => import('@/views/supply-chain/chain-sku-audit.vue'),
        name: 'SKU审核',
        meta: {
          breadcrumb: 'SKU审核',
          title: 'SKU审核',
        },
      },
      {
        path: 'dataSync',
        component: () => import('@/views/supply-chain/chain-data-sync.vue'),
        name: '数据同步',
        meta: {
          breadcrumb: '数据同步',
          title: '数据同步',
        },
      },
    ],
  },
];

export default routes;
