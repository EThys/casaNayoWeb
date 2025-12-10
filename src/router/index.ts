import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/property/:id',
      name: 'property-detail',
      component: () => import('../views/PropertyDetailView.vue'),
    },
    {
      path: '/service/:id',
      name: 'service-detail',
      component: () => import('../views/ServiceDetailView.vue'),
    },
    {
      path: '/properties',
      name: 'all-properties',
      component: () => import('../views/AllPropertiesView.vue'),
    },
    {
      path: '/services',
      name: 'all-services',
      component: () => import('../views/AllServicesView.vue'),
    },
  ],
})

export default router
