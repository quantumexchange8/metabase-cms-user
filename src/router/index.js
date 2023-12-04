import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "@/views/Auth/Login.vue";
import Buttons from "@/views/Buttons.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Auth',
            component: () => import('@/layouts/AuthLayout.vue'),
            children: [
                {
                    path: '/login',
                    name: 'Login',
                    component: () => import('@/views/Auth/Login.vue'),
                },
                {
                    path: '/buttons',
                    name: 'Buttons',
                    component: () => import('@/views/Buttons.vue'),
                },

                // {
                //     path: '/auth/register',
                //     name: 'Register',
                //     component: () => import('@/views/auth/Register.vue'),
                // },
                // {
                //     path: '/auth/forgot-password',
                //     name: 'ForgotPassword',
                //     component: () => import('@/views/auth/ForgotPassword.vue'),
                // },
                // {
                //     path: '/auth/reset-password',
                //     name: 'ResetPassword',
                //     component: () => import('@/views/auth/ResetPassword.vue'),
                // },
                // {
                //     path: '/auth/confirm-password',
                //     name: 'ConfirmPassword',
                //     component: () => import('@/views/auth/ConfirmPassword.vue'),
                // },
                // {
                //     path: '/auth/verify-email',
                //     name: 'VerifyEmail',
                //     component: () => import('@/views/auth/VerifyEmail.vue'),
                // },
            ],
        },
        // {
        //     path: '/',
        //     name: 'home',
        //     component: HomeView
        // },

    ]
})

export default router
