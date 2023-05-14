import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./pages/index.vue'),
    },
    {
        path: '/geometries',
        name: 'Geometries',
        component: () => import('./pages/geometries.vue'),
    },
]
export const router = createRouter({
    history: createWebHistory(),
    routes
})
