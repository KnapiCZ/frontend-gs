import { createRouter, createWebHistory } from 'vue-router';

import Profile from './view/Profile/pages/CurrentUser.vue';
import Gym from './view/GymsClubs/pages/MainPage.vue';
import MainFypPage from './view/ForYouPage/pages/ForYouPage.vue';
import LogIn from './view/Authentication/pages/LogIn.vue';

let isAuthenticated = false

const routes = [
  {
    path: '/profile', // pridat nazev nebo neco jako my profile?
    component: Profile,
    meta:{
      
    }
  },

  {
    path: '/gyms',
    component: Gym
  },

  {
    path: '/foryou',
    component: MainFypPage,
    
  },

  {
    path: '/Login',
    component: LogIn,
    name: 'login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
  
  router.beforeEach((to, from, next)=>{
    if ( to.name !== 'login' && !isAuthenticated ){
      next({
        path: '/Login',
        replace: true
      })
    } else {
      next();
    }
  })

export default router
