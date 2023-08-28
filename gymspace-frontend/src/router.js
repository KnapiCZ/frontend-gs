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
    path: '/', // URL prihlaseneho usera
    name: 'LoggedInUser',
    component: CurrentUser,
    
  },

  {
    path: '/profile/:userhandle',  // URL nejakeho dalsiho usera + tady video ktere ulehci praci https://vueschool.io/lessons/dynamic-routes?friend=vuerouter
    component: OtherUser,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/gyms',
    component: Gym,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/foryou',
    component: MainFypPage,
    meta: {
      requiresAuth: true
    }
    
  },

  {
    path: '/login',
    component: LogIn,
    name: 'login'
  },

  {
    path: '/post/:id/:source/', // :source je prozatimni param aby se mi ukazal obrazek. predpokladam ze source ziskas primo v componente pres :id potom muzes :source/ smazat
    name: 'post',
    component: UserGeneric,
    meta: {
      requiresAuth: true,
    }

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
  
export default router
