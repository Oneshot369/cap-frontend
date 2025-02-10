import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SearchLocationView from '@/views/SearchLocationView.vue'
import Errors from '@/views/ErrorView.vue'
import OneLocation from '@/views/OneLocation.vue'
import LoginVue from '@/views/LoginVue.vue'
import RegisterVue from '@/views/RegisterVue.vue'
import LogoutView from '@/views/LogoutView.vue'
import SavedLocations from '@/views/SavedLocationView.vue'
import AboutView from '@/views/AboutView.vue'
import EditLocationView from '@/views/EditLocationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/search',
      name: 'SearchLocation',
      component: SearchLocationView
    },
    {
      path: '/location',
      name: 'OneLocation',
      component: OneLocation
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginVue
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterVue
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LogoutView
    },
    {
      path: '/user/saved',
      name: 'Locations',
      component: SavedLocations
    },
    {
      path: '/user/location',
      name: 'EditLocation',
      component: EditLocationView
    },
    {
      path: '/404',
      name: 'NotFound',
      component: Errors,
      props: { message: 'Page not found', code: 404 }
    },
    { path: '/error', name: 'Generic Error', component: Errors },
    { path: '/:catchAll(.*)', redirect: '/404' }
  ]
})

export default router
