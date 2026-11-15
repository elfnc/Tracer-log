import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: () => import('@/pages/DashboardPage.vue'),
        },
        {
            path: '/kanban',
            name: 'kanban',
            component: () => import('@/pages/KanbanPage.vue'),
        },
        {
            path: '/report',
            name: 'report',
            component: () => import('@/pages/ReportPage.vue'),
        },
        {
            path: '/history',
            name: 'history',
            component: () => import('@/pages/HistoryPage.vue'),
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('@/pages/SettingsPage.vue'),
        },
    ],
})

export default router