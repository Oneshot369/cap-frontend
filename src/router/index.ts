import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RequestView from '../views/RequestView.vue'
import SearchResults from '@/components/SearchResults.vue'
import ForecastGraph from '@/components/ForecastGraph.vue'
import Errors from '@/components/Errors.vue'
import OneLocation from '@/views/OneLocation.vue'
import LoginVue from '@/views/LoginVue.vue'
import RegisterVue from '@/views/RegisterVue.vue'
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
      path: '/search',
      name: 'Test request',
      component: RequestView
    },
    {
      path: '/location',
      name: 'OneLocation',
      component: OneLocation,
      
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginVue,
      
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterVue,
      
    },
    { path: '/404', 
      name: "Not Found",
      component: Errors,
      props: {message: "Page not found", code: 404}
     },
     { path: '/error', 
      name: "Generic Error",
      component: Errors,
      props: {message: "An error occurred", code: 500}
     },  
    { path: '/:catchAll(.*)', redirect: '/404' }, 
  ]
})

export default router
