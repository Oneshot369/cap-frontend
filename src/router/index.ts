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
import { JWTcookie } from '@/stores/cookie'
import { Error } from '@/stores/error'
import { adminCookie } from '@/stores/admin'
import AdminAllUsers from '@/views/AdminAllUsers.vue'
import OneUser from '@/views/OneUser.vue'

const isLoggedIn = () =>{
  if (JWTcookie.cookie == undefined) {
    Error.code = 403;
    Error.msg = "Forbidden. You do not have the necessary authorization to see this page."
    return "/error";
  }
  return true;
}

const isAdmin = () =>{
  if (adminCookie.cookie == 'false') {
    Error.code = 403;
    Error.msg = "Forbidden. You do not have the necessary authorization to see this page."
    return "/error";
  }
  return true;
}

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
      beforeEnter: isLoggedIn,
      component: LogoutView
    },
    {
      path: '/user',
      beforeEnter: isLoggedIn,
      name: 'Locations',
      children: [
        {path: 'saved', component: SavedLocations},
        {path: 'location', component: EditLocationView}
      ]
    },
    {
      path: '/admin',
      beforeEnter: isAdmin,
      name: 'Users',
      children: [
        {path: 'users', component: AdminAllUsers},
        {path: 'user/:id', component: OneUser}
      ]
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
