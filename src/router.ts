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
    {
        path: '/textures',
        name: 'textures',
        component: () => import('./pages/textures.vue'),
    },
]
export const router = createRouter({
    history: createWebHistory(),
    routes
})
