import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import apiAuth from '@/logic/API/apiAuth';


let confirmedUser: { log: string }


const routes: Array<RouteRecordRaw> = [

	{
		path: '/login',
		name: 'login',
		component: () => import('@/view/Authentication/pages/LogIn.vue'),
	},

	{
		path: '/signup',
		name: 'signup',
		component: () => import('@/view/Authentication/pages/SignIn.vue'),
	},
	{
		path: '/',
		name: 'landingPage',
		component: () => import('@/view/shared/BottomNavigationBar_Router/BottomNavigationBar.vue'),
		children: [
			{
				path: '',
				name: 'redirect',
				redirect: '/explore'
			},
			{
				path: '/user/:id',
				name: "user",
				component: () => import('@/view/Profile/pages/UserWrapper.vue'),
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
				path: '/explore',
				name: "explore",
				component: () => import('@/view/Explore/pages/Explore.vue'),
				meta: { requiresAuth: true },
				children: [
					{
						path: '',
						redirect: '/foryou'
					},


					{
						path: '/foryou',
						name: "foryou",
						component: () => import('@/view/Explore/pages/ForYou.vue'),
						meta: { requiresAuth: true },
					},
					{
						path: '/challenges',
						name: "explorechallenges",
						component: () => import('@/view/Explore/pages/Challenges.vue'),
						meta: { requiresAuth: true },
					},
					{
						path: '/athletes',
						name: "athletes",
						component: () => import('@/view/Explore/pages/Athetes.vue'),
						meta: { requiresAuth: true },
					},
				]
			},
		]
	},

	{
		path: '/addPost',
		name: "addPost",
		component: () => import('@/view/Post/pages/ChoosePhoto.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/addPost/addInfo',
		name: "addInfo",
		component: () => import('@/view/Post/pages/AddPostInfo.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/division/:id',
		name: "division",
		component: () => import('@/view/Community/pages/Division.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/division/:id/feed/:initialPosition',
		name: "gymfeed",
		component: () => import('@/view/Community/pages/DivisionFeedSlider.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/gym/:id',
		name: "gym",
		component: () => import('@/view/Community/pages/Gym.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/gym/:id/feed/:initialPosition',
		name: "gymfeed",
		component: () => import('@/view/Community/pages/GymFeedSlider.vue'),
		meta: { requiresAuth: true },
	}
]


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

router.beforeEach(async (to, from) => {
	if (to.name == "login" as string || to.name == "signup" as string) return undefined
	await apiAuth('confirmAuth').then((confirm) => {
		confirmedUser = confirm
	}).catch((error) => { console.log(error) })

	if (confirmedUser!.log == 'not logged in' && to.name !== 'login') {
		return { name: 'login' }
	}
})

export default router
