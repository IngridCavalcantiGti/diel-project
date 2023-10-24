import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
    ],
})