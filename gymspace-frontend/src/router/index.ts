import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import api from '@/logic/API/apiAuth';

let confirmedUser: { log: string }


const routes: Array<RouteRecordRaw> = [

	{
		path: '/login',
		name: 'login',
		component: () => import('@/view/Authentication/pages/LogIn.vue'),
	},

	{
		path: '/',
		name: 'landingPage',
		component: () => import('@/view/shared/BottomNavigationBar_Router/BottomNavigationBar.vue'),
		children: [
			{
				path: '',
				name: 'redirect',
				redirect: '/foryou'
			},

			{
				path: '/user/:id',
				name: "user",
				component: () => import('@/view/Profile/pages/GenericUser.vue'),
				props: true,
				meta: { requiresAuth: true },
			},

			{
				path: '/user/:id/post/:initialPosition',
				name: 'post',
				component: () => import('@/view/Post/pages/FeedSlider.vue'),
				props: true,
				meta: { requiresAuth: true, }
			},

			{
				path: '/community',
				name: "community",
				component: () => import('@/view/Community/pages/MainPage.vue'),
				meta: { requiresAuth: true },
			},

			{
				path: '/community/explore',
				name: "explore",
				component: () => import('@/view/Post/pages/FeedSlider.vue'),
				meta: { requiresAuth: true },
			},

			{
				path: '/foryou',
				name: "fyp",
				component: () => import('@/view/ForYouPage/pages/ForYouPage.vue'),
				meta: { requiresAuth: true }
			},
		]
	},
]


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

router.beforeEach(async (to, from) => {
	await api('confirmAuth').then((confirm) => {
		confirmedUser = confirm
	}).catch((error) => { console.log(error) })

	if (confirmedUser!.log == 'not logged in' && to.name !== 'login') {
		return { name: 'login' }
	}
})

export default router
