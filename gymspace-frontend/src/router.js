import { createRouter, createWebHistory } from 'vue-router';

import CurrentUser from './view/Profile/pages/CurrentUser.vue';
import OtherUser from './view/Profile/pages/OtherUser.vue';

import Gym from './view/GymsClubs/pages/MainPage.vue';
import MainFypPage from './view/ForYouPage/pages/ForYouPage.vue';
import LogIn from './view/Authentication/pages/LogIn.vue';
import UserGeneric from './view/Post/components/UserGeneric.vue'

let isAuthenticated = true

const routes = [
  {
    path: '/profile', // URL prihlaseneho usera
    name: 'LogedInUser',
    component: CurrentUser,
  },

  {
    path: '/profile/:userhandle',  // URL nejakeho dalsiho usera + tady video ktere ulehci praci https://vueschool.io/lessons/dynamic-routes?friend=vuerouter
    component: OtherUser,
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
  },

  {
    path: '/post/:id/:source/', // :source je prozatimni param aby se mi ukazal obrazek. predpokladam ze source ziskas primo v componente pres :id potom muzes :source/ smazat
    name: 'post',
    component: UserGeneric

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
