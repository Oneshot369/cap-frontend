import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RequestView from '../views/RequestView.vue'
import SearchResults from '@/components/SearchResults.vue'
import ForecastGraph from '@/components/ForecastGraph.vue'
import Errors from '@/components/Errors.vue'
//import { compatProps } from 'vue-chartjs/dist/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/test',
      name: 'Test request',
      component: RequestView
    },
    {
      path: '/graph',
      name: 'Test a graph',
      component: ForecastGraph
    },
    {
      path: '/results',
      name: 'SearchResults',
      component: SearchResults,
    },
    { path: '/404', 
      name: "Not Found",
      component: Errors,
      props: {message: "Page not found", code: 404}
     },  
    { path: '/:catchAll(.*)', redirect: '/404' }, 
  ]
})

export default router
