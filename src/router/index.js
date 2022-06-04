import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'search',
    component: () =>
      import(/* webpackChunkName: "SearchView" */ '@/views/SearchView'),
  },
  {
    path: '/hotel',
    name: 'hotel',
    component: () =>
      import(/* webpackChunkName: "HotelView" */ '@/views/HotelView'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
