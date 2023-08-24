import { createRouter, createWebHistory } from 'vue-router';

import Profile from './view/Profile/pages/CurrentUser.vue';
import Gym from './view/GymsClubs/pages/MainPage.vue';
import MainFypPage from './view/ForYouPage/pages/ForYouPage.vue';

const routes = [
  {
    path: '/',
    component: Profile
  },

  {
    path: '/gyms',
    component: Gym
  },

  {
    path: '/foryou',
    component: MainFypPage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
