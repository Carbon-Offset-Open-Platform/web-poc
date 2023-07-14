// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

export const start: RouteRecordRaw = {
  path: '/',
  name: 'Start',
  component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
};

export const propertyList: RouteRecordRaw = {
  path: '/property',
  name: 'Properties',
  component: () => import(/* webpackChunkName: "propertyList" */ '@/views/PropertyList.vue'),
};

export const tractList: RouteRecordRaw = {
  path: '/tract',
  name: 'Tracts',
  component: () => import(/* webpackChunkName: "tractList" */ '@/views/TractList.vue'),
};

// export const tractDetails: RouteRecordRaw = {
//   path: '/tract/:id',
//   name: 'Tract details',
//   component: () => import(/* webpackChunkName: "tractDetails" */ '@/views/TractDetails.vue'),
// };

export const buy: RouteRecordRaw = {
  path: '/buy',
  name: 'Buy',
  component: () => import(/* webpackChunkName: "buy" */ '@/views/Buy.vue'),
};

export const sell: RouteRecordRaw = {
  path: '/sell',
  name: 'Sell',
  component: () => import(/* webpackChunkName: "sell" */ '@/views/Sell.vue'),
};

const routes: Array<RouteRecordRaw> = [
  start,
  propertyList,
  tractList,
  buy,
  sell,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  // Check if the route exists
  if (router.hasRoute(to.name || '')) {
    // Route exists, proceed with navigation
    next();
  } else {
    // Route does not exist, redirect to a specific path
    next(start);
  }
});

export default router
