import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

import apiAuth from "@/logic/API/apiAuth"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/test",
        name: "test",
        component: () => import("@/view/TestPages/TestPageOne.vue"),
        meta: { requiresAuth: false },
    },

    {
        path: "/login",
        name: "login",
        component: () => import("@/view/Authentication/pages/LogIn.vue"),
        meta: { requiresAuth: false },
    },

    {
        path: "/signup",
        name: "signup",
        component: () => import("@/view/Authentication/pages/SignUp.vue"),
        meta: { requiresAuth: false },
        children: [
            {
                path: "",
                name: "redirect1",
                redirect: "/step-1",
            },

            {
                path: "/step-1",
                name: "signUpStep1",
                component: () => import("@/view/Authentication/pages/SignUpStep1.vue"),
                meta: { requiresAuth: false },
            },
            {
                path: "/step-2",
                name: "signUpStep2",
                component: () => import("@/view/Authentication/pages/SignUpStep2.vue"),
                meta: { requiresAuth: false },
            },
            {
                path: "/step-3",
                name: "signUpStep3",
                component: () => import("@/view/Authentication/pages/SignUpStep3.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/step-4",
                name: "signUpStep4",
                component: () => import("@/view/Authentication/pages/SignUpStep4.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/step-5",
                name: "signUpStep5",
                component: () => import("@/view/Authentication/pages/SignUpStep5.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/step-6",
                name: "signUpStep6",
                component: () => import("@/view/Authentication/pages/SignUpStep6.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/step-7",
                name: "signUpStep7",
                component: () => import("@/view/Authentication/pages/SignUpStep7.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/step-8",
                name: "signUpStep8",
                component: () => import("@/view/Authentication/pages/SignUpStep8.vue"),
                meta: { requiresAuth: true },
            },
        ],
    },

    {
        path: "/user/:id/trainer",
        component: () => import("@/view/Explore/pages/Athletes.vue"),
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: "/user/:id/trainertab",
        component: () => import("@/view/Explore/pages/AthletesUser.vue"),
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: "/user/:id/coachingapp",
        component: () => import("@/view/Explore/pages/CoachingApp.vue"),
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: "/user/delete-account",
        component: () => import("@/view/Profile/pages/DeleteAccount.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/",
        name: "landingPage",
        component: () => import("@/view/shared/BottomNavigationBar_Router/BottomNavigationBar.vue"),
        children: [
            {
                path: "",
                name: "redirect",
                redirect: "/community",
            },
            {
                path: "/user/:id",
                name: "user",
                component: () => import("@/view/Profile/pages/UserWrapper.vue"),
                props: true,
                meta: { requiresAuth: true },
            },
            {
                path: "/user/:id/post/:initialPosition",
                name: "post",
                component: () => import("@/view/Post/pages/FeedSlider.vue"),
                props: true,
                meta: { requiresAuth: true },
            },
            {
                path: "/community",
                name: "community",
                component: () => import("@/view/Community/pages/MainPage.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/gym/:id",
                name: "gym",
                component: () => import("@/view/Community/pages/Gym.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/explore",
                component: () => import("@/view/Explore/pages/Explore.vue"),
                meta: { requiresAuth: true },
                children: [
                    {
                        path: "",
                        redirect: "/foryou",
                    },

                    {
                        path: "/foryou",
                        name: "foryou",
                        component: () => import("@/view/Explore/pages/ForYou.vue"),
                        meta: { requiresAuth: true },
                    },
                    {
                        path: "/challenges",
                        name: "explorechallenges",
                        component: () => import("@/view/Explore/pages/Challenges.vue"),
                        meta: { requiresAuth: true },
                    },
                    {
                        path: "/athletes",
                        name: "athletes",
                        component: () => import("@/view/Explore/pages/Athletes.vue"),
                        meta: { requiresAuth: true },
                    },
                ],
            },
        ],
    },

    {
        path: "/addPost",
        name: "addPost",
        component: () => import("@/view/Post/pages/ChoosePhoto.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/addPost/addInfo",
        name: "addInfo",
        component: () => import("@/view/Post/pages/AddPostInfo.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/division/:id",
        name: "division",
        component: () => import("@/view/Community/pages/Division.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/division/:id/feed/:initialPosition",
        name: "gymfeed",
        component: () => import("@/view/Community/pages/DivisionFeedSlider.vue"),
        meta: { requiresAuth: true },
    },

    {
        path: "/gym/:id/feed/",
        name: "gymfeed",
        component: () => import("@/view/Community/pages/GymFeedSlider.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/leaderboards",
        name: "leaderboards",
        component: () => import("@/view/Community/pages/Leaderboards.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/paywall",
        name: "paywall",
        component: () => import("@/view/PayWall/pages/TicketPage.vue"),
        meta: { requiresAuth: false },
    },
    {
        //TODO: projit celej router a optimalizovat a seradit
        path: "/create-gym",
        name: "create-gym",
        component: () => import("@/view/Community/pages/CreateGym.vue"),
        meta: { requiresAuth: false },
    },
    {
        path: "/waiting-screen",
        component: () => import("@/view/Authentication/pages/WaitingScreen.vue"),
        meta: { requiresAuth: true },
    },
]

const router = createRouter({

    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(async (to) => {
    if (!to.meta.requiresAuth) return true

    try {
        const response = await apiAuth.confirmAuth()
        if (response.status !== "success") return { name: "login" }

    } catch (error) {
        console.error("Auth check failed:", error)
        return { name: "login" }
    }
})

export default router
