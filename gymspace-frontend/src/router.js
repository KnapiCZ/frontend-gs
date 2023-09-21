import { createRouter, createWebHistory } from 'vue-router';

import CurrentUser from './view/Profile/pages/CurrentUser.vue';

import Community from './view/Community/pages/MainPage.vue';
import MainFypPage from './view/ForYouPage/pages/ForYouPage.vue';
import LogIn from './view/Authentication/pages/LogIn.vue';
import SliderFYP from './view/ForYouPage/components/SliderFYP.vue';
import Landing from './view/shared/Landing/LandingPage.vue';

const routes = [
  {
    path: '/',
    component: Landing,
    name: 'landingPage'
  },

  {
    path: '/user/:userhandle',  // URL nejakeho dalsiho usera + tady video ktere ulehci praci https://vueschool.io/lessons/dynamic-routes?friend=vuerouter
    component: CurrentUser,
    name: "user",
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/community',
    component: Community,
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
    path: '/posts/:initialPosition', // :source je prozatimni param aby se mi ukazal obrazek. predpokladam ze source ziskas primo v componente pres :id potom muzes :source/ smazat
    name: 'post',
    component: SliderFYP,
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
