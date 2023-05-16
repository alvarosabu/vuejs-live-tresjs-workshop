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
        path: '/materials',
        name: 'Materials',
        component: () => import('./pages/materials.vue'),
    },
    {
        path: '/textures',
        name: 'textures',
        component: () => import('./pages/textures.vue'),
    },
    {
        path: '/lights',
        name: 'lights',
        component: () => import('./pages/lights.vue'),
    },
    {
        path: '/models',
        name: 'models',
        component: () => import('./pages/models.vue'),
    },
]
export const router = createRouter({
    history: createWebHistory(),
    routes
})
