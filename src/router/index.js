import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'Auth',
        component: () => import('@/layouts/AuthLayout.vue'),
        children: [
            {
                path: '/login',
                name: 'Login',
                component: () => import('@/views/Auth/Login.vue'),
                meta: {
                    title: 'Login'
                }
            },
            {
                path: '/buttons',
                name: 'Buttons',
                component: () => import('@/views/Buttons.vue'),
            },
            {
                path: '/register',
                name: 'Register',
                component: () => import('@/views/Auth/Register.vue'),
                meta: {
                    title: 'Register'
                }
            },
            // {
            //     path: '/auth/forgot-password',
            //     name: 'ForgotPassword',
            //     component: () => import('@/views/Auth/ForgotPassword.vue'),
            // },
            // {
            //     path: '/auth/reset-password',
            //     name: 'ResetPassword',
            //     component: () => import('@/views/Auth/ResetPassword.vue'),
            // },
            // {
            //     path: '/auth/confirm-password',
            //     name: 'ConfirmPassword',
            //     component: () => import('@/views/Auth/ConfirmPassword.vue'),
            // },
            // {
            //     path: '/auth/verify-email',
            //     name: 'VerifyEmail',
            //     component: () => import('@/views/Auth/VerifyEmail.vue'),
            // },
        ],
    },
    {
        path: '/dashboard',
        name: 'home',
        component: HomeView,
        meta: {
            title: 'Dashboard'
        }
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
});

export default router
