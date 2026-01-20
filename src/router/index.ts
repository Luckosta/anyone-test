import { createRouter, createWebHistory } from 'vue-router';
import List from '@/components/List.vue';
import PersonEdit from '@/components/PersonEdit.vue';
import Settings from '@/components/Settings.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'list',
            component: List,
        },
        {
            path: '/person/:id',
            name: 'person-edit',
            component: PersonEdit,
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
        },
    ],
});

export default router;
