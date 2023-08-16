import { createRouter, createWebHistory } from 'vue-router';

import Profile from './components/Profile/ProfilePage.vue';
import Gym from './components/Gyms/GymMainPage.vue';

const routes = [
  {
    path: '/',
    component: Profile
  },

  {
    path: '/gyms',
    component: Gym
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
